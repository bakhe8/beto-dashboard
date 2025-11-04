<template>
  <div class="docs-demo">
    <div class="demo-badge">
      <a href="/demo/src/pages/app.html" target="_blank" rel="noopener">Open in Demo (local)</a>
      <span> · </span>
      <a href="https://bakhe8.github.io/beto-dashboard/demo/src/pages/app.html" target="_blank" rel="noopener">Pages</a>
    </div>
    <div class="demo-stage" ref="stage" v-html="code"></div>
    <div class="demo-panels">
      <div class="demo-editor">
        <label class="demo-label">HTML</label>
        <textarea v-model="code" :rows="rows" spellcheck="false" />
        <div class="demo-actions">
          <button @click="run">Run</button>
          <button @click="copy">Copy</button>
        </div>
      </div>
      <div class="demo-props">
        <div class="props-header">
          <label class="demo-label">Props JSON</label>
          <div class="right">
            <select v-model="selected" @change="refreshProps">
              <option v-for="(c, i) in comps" :key="i" :value="i">{{ i+1 }}. {{ c.name }}</option>
            </select>
            <button class="mini" @click="refreshAll">↻</button>
          </div>
        </div>
        <textarea v-model="propsJson" :rows="Math.max(4, Math.min(14, rows-2))" spellcheck="false" />
        <div class="demo-actions">
          <button @click="applyProps">Apply Props</button>
        </div>
        <p v-if="propsError" class="error">{{ propsError }}</p>
        <div v-if="validation" class="hint">
          <div class="hint-title">Validation</div>
          <pre class="bd-mono">{{ validation }}</pre>
        </div>
        <div v-if="hintText" class="hint">
          <div class="hint-title">Hint for {{ currentName }}</div>
          <pre class="bd-mono">{{ hintText }}</pre>
        </div>
      </div></div></div>
  <div class="demo-links">
    <a href="/demo/src/pages/app.html" target="_blank" rel="noopener">Open in Demo App (local)</a>
    <span> · </span>
    <a href="https://bakhe8.github.io/beto-dashboard/demo/src/pages/app.html" target="_blank" rel="noopener">Open in Demo App (Pages)</a>
    <span> · </span>
    <a href="https://bakhe8.github.io/beto-dashboard/demo/src/pages/demo-dashboard.html" target="_blank" rel="noopener">Demo Dashboard (Pages)</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps<{ source: string, rows?: number }>()
const rows = props.rows ?? 8
const code = ref(props.source.trim())
const stage = ref<HTMLElement | null>(null)

// Component selection
const comps = ref<{el: HTMLElement, name: string}[]>([])
const selected = ref(0)

const propsJson = ref('')
const propsError = ref('')
const currentName = ref('')
const hintText = ref('')
const validation = ref('')

function run() { /* re-render handled by v-html + onUpdated */ }
async function copy(){ try { await navigator.clipboard.writeText(code.value) } catch {} }

function mountAllIn(el: HTMLElement){
  try {
    // @ts-ignore
    const mod = window['__BD_RUNTIME'] || undefined
    if (mod && typeof mod.mountAll === 'function') mod.mountAll()
  } catch {}
}

function scanComponents(){
  const root = stage.value
  const out: {el: HTMLElement, name: string}[] = []
  if (root){
    root.querySelectorAll<HTMLElement>('[data-component]').forEach(el=>{
      out.push({ el, name: el.getAttribute('data-component') || 'unknown' })
    })
  }
  comps.value = out
  if (selected.value >= out.length) selected.value = 0
  currentName.value = out[selected.value]?.name || ''
}

function schemaFor(name: string){
  try {
    // @ts-ignore
    const mod = (window as any)['__BD_SCHEMAS']
    const get = mod?.getComponentPropSchema
    return typeof get === 'function' ? get(name) : undefined
  } catch { return undefined }
}

function refreshProps(){
  propsError.value = ''
  validation.value = ''
  const item = comps.value[selected.value]
  currentName.value = item?.name || ''
  try {
    const raw = item?.el.getAttribute('data-props') || '{}'
    const parsed = raw ? JSON.parse(raw) : {}
    propsJson.value = JSON.stringify(parsed, null, 2)
    validate(parsed)
  } catch (e:any) {
    propsJson.value = '{ }'
    propsError.value = 'Failed to read props: '+(e?.message || e)
  }
  loadHint()
}

function applyProps(){
  propsError.value = ''
  try {
    const obj = propsJson.value.trim() ? JSON.parse(propsJson.value) : {}
    const item = comps.value[selected.value]
    if (item?.el) {
      item.el.setAttribute('data-props', JSON.stringify(obj))
      validate(obj)
      mountAllIn(stage.value as HTMLElement)
    } else {
      propsError.value = 'No component root found in the HTML panel.'
    }
  } catch (e:any) {
    propsError.value = 'Invalid JSON: '+(e?.message || e)
  }
}

function validate(obj: any){
  try {
    const schema = schemaFor(currentName.value)
    if (!schema) { validation.value = ''; return }
    const res = schema.safeParse(obj)
    if (res.success) { validation.value = 'OK' }
    else {
      validation.value = res.error.errors.map((e: any)=>{
        const path = e.path?.join('.') || '(root)'
        return `- ${path}: ${e.message}`
      }).join('\n')
    }
  } catch (e: any) {
    validation.value = 'Validation failed: '+(e?.message || e)
  }
}

function refreshAll(){ scanComponents(); refreshProps() }

function loadHint(){
  const name = currentName.value
  const hints: Record<string, any> = {
    Modal: { size: 'sm|md|lg' },
    Card: { title: 'Title' },
    Table: { columns: [{ key: 'name', label: 'Name' }], data: [{ name: 'John' }] },
    ChartWidget: { labels: ['Mon','Tue'], data: [1,2], title: 'Weekly' },
    ThemeSwitcher: {},
    ConfirmDialog: { title: 'Delete', message: 'Are you sure?', confirmLabel: 'OK', cancelLabel: 'Cancel' },
    List: { items: ['Alpha','Beta','Gamma'] },
    Sidebar: {},
    Loader: { type: 'spinner' },
    FormGroup: { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    FormGroupValidated: { name: 'username', label: 'Username', minLength: 3, maxLength: 12, placeholder: 'yourname' }
  }
  const hint = hints[name]
  hintText.value = hint ? JSON.stringify(hint, null, 2) : ''
}

onMounted(()=>{ if (stage.value) { mountAllIn(stage.value); scanComponents(); refreshProps() } })
onUpdated(()=>{ if (stage.value) { mountAllIn(stage.value); scanComponents() } })
watch(code, ()=>{ /* re-render occurs via v-html */ })
</script>

<style scoped>
.docs-demo { border:1px solid var(--vp-c-divider); border-radius:8px; overflow:hidden; }
.demo-badge { padding:6px 8px; border-bottom:1px solid var(--vp-c-divider); background:var(--vp-c-bg); font-size:12px; text-align:right }
.demo-badge a { color: var(--vp-c-brand-1); text-decoration: none; }
.demo-badge a:hover { text-decoration: underline; }
.demo-stage { padding:12px; background: var(--vp-c-bg-soft); }
.demo-panels { display:grid; grid-template-columns: 1fr 1fr; gap:8px; padding:8px; background: var(--vp-c-bg); align-items: start; }
.demo-editor, .demo-props { display:grid; grid-template-rows: auto 1fr auto auto; gap:8px; }
.demo-label { font-size:12px; color: var(--vp-c-text-2); }
textarea { width:100%; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; border:1px solid var(--vp-c-divider); border-radius:6px; padding:6px; background: var(--vp-c-bg-soft); color: var(--vp-c-text); }
.demo-actions { display:flex; gap:8px; }
button { background: var(--vp-c-brand-1); color:#fff; border:none; border-radius:6px; padding:6px 10px; cursor:pointer; }
button+button { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); border:1px solid var(--vp-c-divider); }
.props-header { display:flex; justify-content: space-between; align-items:center; gap:8px; }
.props-header .right { display:flex; gap:6px; align-items:center; }
select { font-size:12px; padding:2px 6px; }
.mini { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); border:1px solid var(--vp-c-divider); padding:2px 6px; border-radius:6px; }
.error { color: #dc2626; font-size: 12px; margin: 0; }
.hint { margin-top:8px; border:1px dashed var(--vp-c-divider); border-radius:6px; padding:6px; }
.bd-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; } .demo-links { padding: 8px; border-top: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); font-size: 12px; } .demo-links a { color: var(--vp-c-brand-1); text-decoration: none; } .demo-links a:hover { text-decoration: underline; }
</style>
