# 글 쓰는 법

새 글은 파일 하나를 만들고 목록에 한 줄을 추가하면 끝이다.
홈 화면의 Thoughts 섹션(최신 5개)과 Blog 페이지는 둘 다 `posts.json`을 읽으므로 HTML은 고칠 필요가 없다.

## 1. 글 쓰기

`writing/posts/` 안에 Markdown 파일을 만든다.
파일 이름이 곧 주소가 된다.

- 파일: `writing/posts/my-first-post.md`
- 주소: `writing/post.html?p=my-first-post`

파일 이름은 영어 소문자, 숫자, 하이픈(`-`)만 쓴다.
제목은 `posts.json`에서 가져오므로 본문 맨 위에 `# 제목`을 다시 쓰지 않는다.
본문의 소제목은 `##`, 그 아래는 `###`를 쓴다.

## 2. 목록에 추가

`writing/posts.json` 배열에 항목 하나를 추가한다.
순서는 상관없고, 날짜 기준으로 최신 글이 위에 오도록 자동 정렬된다.

```json
{
  "slug": "my-first-post",
  "title": "My first post",
  "summary": "목록과 글 상단에 보이는 한 줄 설명.",
  "tag": "Essay",
  "date": "2026-11-05"
}
```

- `slug`: 파일 이름에서 `.md`를 뺀 것.
- `tag`: `Essay`, `Project`, `Note` 중 하나를 쓰면 색이 입혀진다.
  다른 이름도 쓸 수 있고, 그때는 회색 태그가 된다.
  새 태그 색은 `assets/site.css`의 `.tag[data-tag="..."]`에서 정한다.
- `date`: `YYYY-MM-DD` 형식.
- `"draft": true`를 넣으면 목록에서는 숨겨지고, 주소로 직접 들어가면 "Draft" 표시와 함께 보인다.

JSON은 마지막 항목 뒤에 쉼표가 있으면 깨지니 주의한다.
목록이 안 뜨면 대부분 이 문제다.

## 쓸 수 있는 것

- 코드 블록: ` ```python ` 처럼 언어 이름을 붙이면 색이 입혀진다.
- 수식: 문장 안에서는 `$E = mc^2$`, 따로 한 줄로는 `$$ ... $$`.
  일반 달러 기호는 `\$`로 쓴다.
- 이미지: 그림 파일을 `writing/posts/`에 두고 `![설명](그림.png "캡션")`처럼 쓴다.
  따옴표 안의 캡션은 그림 아래에 표시된다.
- 표, 인용(`>`), 목록, 링크 등 일반 Markdown 문법.

## 로컬에서 미리 보기

글은 `fetch`로 불러오기 때문에 HTML 파일을 더블클릭해서 열면 보이지 않는다.
사이트 폴더에서 아래 명령을 실행하고 `http://localhost:8000`을 연다.

```bash
python3 -m http.server
```
