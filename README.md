# md2steam

This action converts a Markdown file to Steam BBCode.

## Usage

See [action.yml](action.yml)

```yml
- name: Markdown to BBCode
  uses: kaiser-chris/md2steam-github-action@v1
  with:
    # Required: Path to the Markdown file to convert
    file: ''
```

### Example
```yml
- uses: actions/checkout@v4
- uses: kaiser-chris/md2steam-github-action@v1
  id: conversion
  with:
    file: 'Test.md'
- run: echo "${{ steps.conversion.outputs.bbcode }}"
```

## Credit
This converter is based on the [md2steam-review-formatting](https://github.com/ahuglajbclajep/md2steam-review-formatting) by [ahu](https://github.com/ahuglajbclajep).

The original converter is a web application that can be found here:
- https://ahuglajbclajep.github.io/md2steam-review-formatting/

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)