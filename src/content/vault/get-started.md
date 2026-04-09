---
title: "Get Started"
---
### 1. Installation
nce 

```bash
pip install refinekit
```

### 2. Run extraction

```bash
refinekit run \
  --input articles/ \
  --class-name "Article" \
  --description "news article" \
  --schema "title: article title, author: author name, category enum[politics,tech,science,business]: article category"
```

### 3. Review results

Generate an interactive HTML review interface:

```bash
refinekit review
```

### 4. Improve 

Get suggestions on how to improve processing workflow:

```bash
refinekit improve
```

### 5. Replay

Replay pipeline for regression tests:

```bash
refinekit replay
```
