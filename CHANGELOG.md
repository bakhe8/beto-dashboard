# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [1.0.0] - 2024-07-26

### Added
- Complete documentation for core components: `Modal`, `Table`, `ThemeSwitcher`, `Sidebar`, and `Loader`.

### Changed
- Refactored the global `store` to use a key-based subscription model, improving performance and component isolation.

### Fixed
- A critical reactivity bug where components would stop receiving store updates after the `Modal` was opened and closed. This resolves a persistent E2E test failure.