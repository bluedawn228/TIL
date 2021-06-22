# Github Flow - Github으로 협업하는 흐름

## Git Flow란
[https://nvie.com/posts/a-successful-git-branching-model/]()  
Git을 활용하여 협업하는 흐름으로 `branch를 활용하는 전략`을 의미한다. 가장 대표적으로 활용되는 전략은 다음과 같다.
![image](https://user-images.githubusercontent.com/68311318/122923601-d44cdd00-d39f-11eb-829c-74da2167ef11.png)  

**branch별 특징과 예시**  
master(main) : 배포 가능한 상태의 코드  
예 : LOL클라이언트 라이브 버전(9.23.298.3143)  

develop(main) : feature branch로 나뉘어지거나, 발생된 버그 수정 등 개발 진행. 개발 이후 release branch로 갈라짐  
예 : 다음 패치를 위한 개발(9.24)  

feature branches(supporting) : 기능별 개발 브랜치(topic branch). 기능이 반영되거나 드랍되는 경우 브랜치 삭제.  
예 : 개발시 기능별 : 예) 신규챔피언 세나, 드래곤 업데이트  

release branches(supporting) : 개발 완료 이후 QA/Test 등을 통해 얻어진 다음 배포 전 minor bug fix 반영.  
예 : 9.24a, 9.24b, ...  

hotfixes(supporting) : 긴급하게 반영 해야하는 bug fix. realease branch는 다음 버전을 위한 것이라면, hotfix branch는 현재 버전을 위한것.  
예 : 긴급 패치를 위한 작업 : 예) 버그로 인한 챔피언 선택금지   

**Git Flow는 정해진 답이 잇는 것은 아니다**  
Github Flow, Gitlab Flow 등의 각 서비스별 제안되는 흐름이 있으며, 변형되어 각자의 프로젝트/회사에서 활용되고 있다. 간단하게 브랜치를 활용하는 명령어를 알아보고, 프로젝트에 활용할 수 있는 간단한 버전의 브랜치 전략을 배워보자.  

**Branch basic Commands**  
생성 : git branch {branch name}  
이동 : git checkout {branch name}  
생성 및 이동 : git checkout -b {branch name}  
목록 : git branch  
삭제 : git branch -d {branch name}  

**Branch merge**  
각 branch에서 작업을 한 이후 이력을 합치기 위해서는 일반적으로 merge 명령어를 사용한다. 병합을 진행할 때, 만약 서로 다른 이력(commit)에서 동일한 파일을 수정할 경우 충돌이 발생할 수 있다. 이 경우에는 반드시 직접 수정을 진행해야 한다. 충돌이 발생한 것은 오류가 발생한 것이 아니라 이력이 변경되는 과정에서 반드시 발생할 수 있는 것이다.  

**1. Branch merge - fast forward**  
git merge feature-a  
![image](https://user-images.githubusercontent.com/68311318/122927653-0ceeb580-d3a4-11eb-98c3-af1e360ce37e.png)
**2. Branch merge - merge commit**  
git merge feature-a  
![image](https://user-images.githubusercontent.com/68311318/122928028-6ce55c00-d3a4-11eb-8f0f-56c19f9e4cb6.png)  
- 2.1 충돌이없는 경우  
- 2.2 충돌이있는 경우

**3. Branch merge - -no-ff(심화)**  
fast fowarding 상황에서도 commit을 발생시키는 옵션. branch이력을 유지한다는 장접이 있다.  
git merge -no-ff feature-a   
![image](https://user-images.githubusercontent.com/68311318/122928435-d6656a80-d3a4-11eb-9faf-8be461537bb4.png)  
그림이 이해가 안간다.  

**Branch rebase**  
rebase는 merge와 최종 결과는 같으나, commit history만 다르게 형성된다. 따라서, remote repository에 push된 commit에 대해서는 절대 rebase를 진행하면 안된다. 나중에 공부하자.  
https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0  

## Github Flow 기본 원칙
Github Flow는 Github에서 제안하는 브랜치 전략으로 다음과 같은 기본 원칙을 가지고 있다.  
1. master branch는 반드시 배포 가능한 상태여야 한다.  
There's only one rule: anything in the master branch is always deployable.  

2. `feature branch`는 각 기능의 의도를 알 수 있도록 작성한다.  
Your branch name should be descriptive,  
so that others can see what is being worked on.  

3. Commit message는 매우 중요!!!!하며, 명확하게 작성한다.  
Commit messages are important. By writing clear commit messages,  
you can make it easier for other people to follow along and provide  feedback.  

4. `Pull Request`를 통해 협업을 진행한다.  
Pull Requests are useful for contributing to open source projects and for managing changes to shared repositories.  

5. 변경사항을 반영하고 싶다면, `master` branch에 `병합`한다.  
Now that your changes have been verified in production, it is time to merge your code into the master branch.  

### Github Flow Models  
앞서 설명된 기본 원칙 아래 Github에서 제시하는 방법이 2가지가 있다.  
- Shared Repository Model
- Fork & Pull Model  

이 두 모델의 가장 큰 차이점은 내(작업자)가 해당 프로젝트 저장소에 직접적인 push 권한이 있는지 여부!  
https://guides.github.com/를 참고하라  

#### 1. Shared Repository Model
Shared Repository Model은 동일한 저장소를 공유하여 활용하는 방식.  

순서  

**0-1. Invite collaborator**  
당 저장소에 대한 push 권한이 부여된다.  

**0-2. Accept Invitation**  
이메일을 통한 초대 수락. 이메일이 아닌 해당 저장소 주소 뒤에 /invitations을 붙이면 수락하는 화면이 나옴.  

**0-3. Clone project(remote) repository**  
Clone을 하고 각 작업에 맞춘 작업 환경 설정을 마무리 한다. 예를 들면, node의 경우 일반적으로 .gitignore에 node_moduels/가 등록되어 있으므로 npm install을 진행.   

**1-1. Create feature branch**  
`작업은 항상 독립적인 feature branch에서 한다.` master branch는 `항상 배포 가능한 상태를 유지`하고, 영향이 가지 않도록 독립적인 branch에서 작업을 하는 것이다. feature branch는 이름을 생성할 때, 기능을 명시적으로 나타낸다.  
```
(master) $ git checkout -b feature/accounts-login
(feature/accounts-login) $ touch develop-login.txt
```
작업시 항상 어떠한 branch에 있는지 확인하는 것이 중요하다.  

**2-1. Commit : Commit을 통해 작업의 이력(history)을 남긴다.**  
Commit은 다른 사람들이 내가 한 작업들을 확인할 수 있는 이력이며, 코드의 변화에 맞춰 실시한다. Commit 메시지는 매우 중요하며, 일관된 형식으로 해당 이력을 쉽게 파악할 수 있도록 작성한다. (commit 메시지를 활용하면 Github 작업을 이끌 수도 있다.)  
```
(feature/accounts-login) $ git add develop-login.txt
(feature/accounts-login) $ git commit -m ‘Complete login feature’
```
git status와 git log 명령어를 반드시 활용하여 상태를 파악하자.  

**2-2. Push to remote repository**  
완성된 코드는 원격 저장소에 push를 한다. master branch에 Push 하지 않도록 유의한다. 
```
(feature/accounts-login) $ git push origin feature/accounts-login
```
git push를 하기 이전에, 코드와 커밋 상태를 반드시 확인하자. (status, log)
원격 저장소에 공개된 이력은 절대 변경 하여서는 안된다.  

**3-1. Open a Pull Request**  
Github에 들어가서 Pull Request 버튼을 누른다.  
Github Flow에서 핵심은 Pull Request를 통한 협업이라고 할 수 있다.  

**3-2 Create Pull Request**  
PR과 관련된 설정을 진행한 후 요청을 생성한다.  
![image](https://user-images.githubusercontent.com/68311318/122933419-9bb20100-d3a9-11eb-8239-5ff9235e5d1f.png)  
위에서부터 브랜치를 확인하고, 내용을 마크다운으로 작성하고,   
(예 : 제목 : Complete login feature   
내용 : Create accounts app, Add User model based AbstractUser, Add Login urls, Add Bootstrap for Login form)  
오른쪽에서 리뷰어 지정 등 옵션을 설정한다.  

**3-3 Merge Pull Request**  
작성된 코드를 확인 후 병합  
* 병합(merge) 과정에서 `충돌`이 발생할 경우 해결 후 병합을 진행한다.  
* 병합시 커밋 이력을 `정리`하기 위한 추가 옵션을 선택할 수도 있다. (squash : 커밋 병합, rebase)  
* master branch로 병합의 경우 코드가 반드시 `배포 가능한 상태`여야 한다.  
![image](https://user-images.githubusercontent.com/68311318/122934416-7a9de000-d3aa-11eb-8833-4b8a6fe6e82c.png)  

https://docs.github.com/en/github/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#rebase-and-merge-your-pull-request-commits  

**3-4. Merged"!!**  
* 병합이 완료되면, master 브랜치에 반영된 것을 확인할 수 있다.  
![image](https://user-images.githubusercontent.com/68311318/122934902-e54f1b80-d3aa-11eb-9f57-6affcd4920dd.png)  
![image](https://user-images.githubusercontent.com/68311318/122934750-c6508980-d3aa-11eb-93a6-20ad528f5d6f.png)  

**step 4. while True**  
" $ 다음 작업 준비!  
* 로컬 저장소에서는 `merge된 branch는 삭제`하고 master branch를 업데이트 한다.  
* 이후 1~3 과정을 반복한다.  
```
(feature/accounts-login) $ git checkout master
(master) $ git branch -d feature/accounts-login
(master) $ git pull origin master
(master) $ git checkout -b feature/new-feature
(feature/new-feature) $
```
로컬에서는 브랜치 삭제했는데, 원격에서 따로 delete branch 버튼눌러서 삭제해야하는건가?  

#### 2. Fork & Pull Model
Fork & Pull Model은 Repository에 Collaborator에 등록되지 않고,
Pull request를 통한 협업이 가능. Github 기반의 `오픈소스` 참여 과정에서 쓰이는 방식.  

**0-1. Fork repository**  
* 원격 저장소를 fork한다.
* 내 저장소로 복제본을 가져옴으로써 로컬에서 작업 후 원격 저장소로 push할 수 있게 되는 것.  

**3-1까지 동일**  
**3-2. 위와 유사**  
PR과 관련된 설정을 진행한 후 요청을 생성한다.  
자동으로 fork 대상 저장소를 base repository로 설정하는 것을 확인할 수 있다.
**동일**  
**4.while True: but, upstream"!!(위와 다름)**  
다음 작업 준비!  
* 기존에는 단순히 새로 반영된 내용을 받아오기 위하여 origin으로 부터 pull을 받아왔지만,  
지금 설정되어 있는 origin은 나의 저장소이다.  
* 따라서, project 저장소를 새롭게 원격 저장소(upstream)로 등록하고 받아와야 한다.  
```
(feature/accounts-login) $ git checkout master
(master) $ git branch -d feature/accounts-login
(master) $ git remote -v
origin https:"//github.com/no-yeah-contributor/fork-pull-model.git(fetch)
origin https:"//github.com/no-yeah-contributor/fork-pull-model.git(push)
(master) $ git remote add upstream https:"//github.com/github-flowtutorials/
fork-pull-model.git
(master) $ git pull upstream master
(master) $ git checkout -b feature/new-feature
(feature/new-feature) $
```

**정리**  
* 앞서 설명한 대로 Fork & Pull Model은 내가 직접적인 push 권한이 없다는 것이다!  
* 즉, 오픈소스 프로젝트에 참여하기 위해서는 반드시 `이 모델`로 구성을 해야한다.  
![image](https://user-images.githubusercontent.com/68311318/122939361-84c1dd80-d3ae-11eb-9194-5a76a0e31f31.png)  

**부록 : Review, Close 등**  
Pull request를 활용하면, 작업된 이력에 작성된 `코드 라인별로` 리뷰를 작성할 수도 있다.  
* 물론, close가 될 수도 있다  

**참고해야할 자료**  
https://git-scm.com/book/ko/v2  
https://guides.github.com/  
https://guides.github.com/introduction/flow/  
https://guides.github.com/activities/hello-world/  
https://guides.github.com/activities/forking/  

**무한으로 즐길 수 있는 git tips**  
https://github.com/mingrammer/git-tips (한국어 번역)  

**프로젝트 시작전에 잊지 말아야 할 .gitignore**  
https://github.com/github/gitignore/blob/master/Python.gitignore  
https://github.com/github/gitignore/blob/master/Node.gitignore  