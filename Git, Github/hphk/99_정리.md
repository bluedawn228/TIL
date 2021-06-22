## 정리
![Screen Shot 2021-06-22 at 오후 3.37](md-images/Screen%20Shot%202021-06-22%20at%20%EC%98%A4%ED%9B%84%203.37.png)
실제폴더에서 touch a.txt한다  
그 폴더를 init한다. 그럼 세개의 통이 생긴다. 이때 a.txt는 WD통에 있다.  
a를 add하면 SA통에 올라간다.  
이때 status 해보면 WD와 SA의 상태를 확인할 수 있다.  
commit하면 a.txt가 commits통에 올라간다.  
이때 log하면 commits통의 상태를 확인할 수 있다.  
push하면 원격저장소(github)에 올라간다. 그림에 github에 두개의 통이있는데 밑에 통은 무시해도된다.  
우리가 방금과는 다른 작업공간에서(집, 강의장 등) pull을 한다면 a.txt는 WD에? 올것이다. 우리가 a를 실수로 SA에 올렸다고 가정하자(예를 들면 아무생각없이'git add .'을 했다던지). 그랬을때 WD로 내리는(무대 위에서 내리는) 명령어는 무엇일까? restore --staged이다. 왜냐하면 a는 이전에 한번 commit된적이 있다. 한번 commit된 이력이 있는(tracked) 애들은 restore --staged해야 WD로 내려오고, 한번도 commit된적이 없는(untracked) 애들은 rm --cached를 해야 WD로 내려온다.  
그리고 맨 왼쪽에 있는 restore는 WD에 있는 modified된 애들(즉, git이 관리하는데 수정된애들)의 내용물을 되돌리는 명령어이다.  