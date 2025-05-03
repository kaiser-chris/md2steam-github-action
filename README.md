# md2steam

This action converts a Markdown file to Steam BBCode.

## Usage

See [action.yml](action.yml)

```yml
- name: Markdown to BBCode
  uses: ./
  with:
    # Required: Path to the Markdown file to convert
    file: ''
```

### Example
```yml
- uses: actions/checkout@v4
- uses: actions/md2steam@v1
  id: conversion
  with:
    file: 'Test.md'
- run: echo "${{ steps.conversion.outputs.bbcode }}"
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)