# undoing

## 1. 파일을 SA에서 WD로 내리기

1. `$ git rm --cached <file>`
   - commit 이력이 없을 때 SA -> WD
2. `$ git restore --staged <file>`
   - commit 이력이 있을 때 SA -> WD

예 : `$ git restore --staged a.txt`  

## 2. WD에 있는 modified된 파일을 되돌리는 방법
- 우리가 git status를 해보면 modified(수정된)가 붙어있는 애들이 있다. 이들은 commit이력이 있는 애들이다. commit이력이 없는 애들을 아무리 수정해봐도 modified가 안붙는 거보면 untracked라서 그런 것 같다. 즉 git이 관리하는 애들은 내용을 수정하면 modified가 붙는 다는 것이다.
- 기존 파일을 덮어쓰는 방식으로 진행하기 때문에 원래 내용은 모두 사라진다!  
- 수정한 내용이 '정말로' 마음에 들지 않을 경우만 사용해야 한다. 해당 명령어를 수행하면 '절대로' 다시 원래로 돌릴 수 없다!!!!  

예 : $ git restore a.txt  

## 3. 완료한 커밋 수정하는 방법
`$ git commit --amend`
### 3.1 커밋 메시지를 수정하고싶다
마지막으로 작성한 커밋 메시지를 되돌리는 방법. 주의해야 할 것은 직전 commit 메시지만 수정 가능하다.  
단, 공개된 저장소(github, gitlab, bitbucket)에 push한 commit 메시지는 절대로 수정 금지이다. commit hash 값이 변경되기 때문이다!!  
방법 : `$ git commit --amend`하면 vscode가 열리고 commit 메시지 수정후 닫으면 완료된다.  

### 3.2 어떤 파일을 빼놓고 commit을 한 경우
예를 들면  
```bash
$ touch foo.txt bar.txt
$ git add foo.txt
$ git commit -m "foo & bar"
```
했다고 하자. 실수로 bar.txt를 커밋하지 않았다.  
그랬을때 bar.txt를 "foo & bar" 커밋에 포함시키고 싶으면 다음과 같이한다.  
먼저 SA에 bar을 올린다  
그다음에 `$ git commit --amend`을하면 vscode가 열리고  
```
# On branch master
# Changes to be committed:
#	new file:   bar.txt
#	new file:   foo.txt
```
이런식으로 수정해준다음 파일을 닫으면 완료.

