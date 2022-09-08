## Types of Block

### block
```yaml
- name: cat currently path files
    run: |
        ls
```

### container
container can have multi block 
such as 
```yaml
name: build code
    runs-on: ubuntu
    steps:,
```