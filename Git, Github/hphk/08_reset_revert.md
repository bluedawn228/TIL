# reset vs revert
## 1. reset
시계를 과거로 돌려버림!!  
- 특정 커밋으로 되돌아가며 특정 커밋 이후의 모든 커밋은 사라진다. 
- 파일의 상태는 옵션으로 결정한다.
- commit의 history가 바뀌기 때문에 **다른 사람과 공유하는 브랜치가 있는 경우 절대 사용하면 안됨**  

**3가지 옵션**  
1. `--soft`
   - reset하기 전까지 했던 SA, WD 작업은 그대로 남겨둠
   - 이후의 commit된 파일들을 SA로 돌려놓는다. (==commit 이전의 상태)
   - 바로 다시 commit을 할 수 있는 상태가 된다!

2. `--mixed`
   - SA reset, WD 작업물만 남겨둠
   - 이후의 commit된 파일을 WD로 돌려놓는다. (==add를 하기 전 상태)
   - 옵션을 지정하지 않으면 이게 기본값이다.

3. `--hard`
   - 이후의 commit된 파일을 모두 WD에서 삭제
   - 단, Untracked된 파일은 Untracked 
   - reset을 하기전 SA, WD 모든 작업물을 reset

예 :  git log --oneline했더니 다음과 같이나왔다.
```bash
3e53137 (HEAD -> master) foo & bar
c03c83b finish all things
ae0eeca first commit
```
c03c83b로 돌아가고싶다. 그러면
```bash
git reset c03c83b --hard
```
하면된다.

## 2. revert
특정한 사건을 없었던 일로 만들어버림!!  
- 이전 커밋 이력은 그대로 남겨둠  
- 커밋 히스토리의 변경 없이 해당 커밋의 내용만을 삭제한 상태의 새로운 커밋을 남김  

사용법 : git revert 해시값 하면 vs code에디터 창이 나오고 종료하면 완료. 그리고 git log 해보면 commit이 생겼다.  

reset과의 차이점은 reset은 commit 이력이 없기 때문에 다시 돌아갈 수 없지만 revert는 이전 commit 이력이 모두 남겨져 있기 때문에 다시 돌아갈 수 있다!  

- 다른 사람과 공유하는 브랜치에서 이전 커밋을 수정하고 싶을 때 사용하자. 커밋 이력이 변경되지 않기 때문에 충돌이 발생하지않기 때문이다.  

![Screen Shot 2021-06-22 at 오후 3.23](md-images/Screen%20Shot%202021-06-22%20at%20%EC%98%A4%ED%9B%84%203.23.png)