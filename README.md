# bmjnko.com

Beomjoon Ko의 개인 웹사이트.
프레임워크나 빌드 단계 없이 HTML, CSS, Markdown 파일만으로 동작한다.

## 구조

| 경로 | 내용 |
| --- | --- |
| `index.html` | 홈 (인사말, 소개, 그림, Experience, Thoughts, Recommendations, Contact) |
| `assets/site.css` | 모든 페이지가 함께 쓰는 색, 폰트, 레이아웃 |
| `assets/site.js` | 모바일 메뉴, 사이드바 강조, 스크롤 등장 효과, 글 목록 불러오기 |
| `writing/index.html` | 블로그 목록 |
| `writing/post.html` | 블로그 글 보기 |
| `writing/posts.json` | 블로그 글 목록 |
| `writing/posts/*.md` | 블로그 글 본문 |

메뉴 항목을 바꿀 때는 `index.html`, `writing/index.html`, `writing/post.html` 세 파일을 모두 고친다.
각 파일에 데스크톱 사이드바와 모바일 메뉴가 하나씩 있다.

## 블로그 글 쓰기

`writing/README.md`를 참고한다.

## 로컬에서 미리 보기

블로그 글은 `fetch`로 불러오므로 파일을 더블클릭해서 열면 보이지 않는다.
이 폴더에서 아래 명령을 실행하고 `http://localhost:8000`을 연다.

```bash
python3 -m http.server
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 1~2분 안에 `https://bmjnko.com`에 반영한다.
`https://bmjnko.github.io`로 들어오면 `bmjnko.com`으로 자동으로 넘어간다.

아래 두 파일은 지우지 않는다.

- `.nojekyll`: GitHub가 파일을 가공하지 않고 그대로 올리게 하는 빈 파일.
- `CNAME`: 사용자 지정 도메인(`bmjnko.com`) 설정. GitHub Pages 설정 화면에서 도메인을 바꾸면 GitHub가 이 파일을 직접 커밋하므로, 그 뒤에는 `git pull`로 받아온다.

## 도메인 (Squarespace DNS)

도메인은 Squarespace에서 관리한다.
DNS에는 Squarespace 기본 기록(Squarespace Defaults) 대신 아래 기록만 둔다.

| Host | Type | Data |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `bmjnko.github.io` |

Squarespace의 Website 화면에 뜨는 "Update DNS records" 버튼은 누르지 않는다.
누르면 Squarespace 기본 기록이 다시 들어가서 사이트가 Squarespace 체험판 화면으로 돌아간다.
