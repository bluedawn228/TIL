![image](https://user-images.githubusercontent.com/68311318/121989207-aa5f4d80-cdd6-11eb-8755-46a17ef712c5.png)
```java
package mulcam.comp;

import mulcam.Employee;

public class Company {
  Employee[] emps = new Employee[100];
  int cnt;
  public void addEmployee(Employee emp) {
    emps[cnt++] = emp;
  }
  public void allEmployeeInfo() {
    for(int i=0; i<cnt; i++) {
      System.out.println(emps[i].info());
    }
  }
  public int getTotalPay() {
    int tot=0;
    for(int i=0; i<cnt; i++) {
      tot += emps[i].getPay(); // 에러
    }
    return tot;
  }
}
```
Employee에 pay가 없으므로 emps[i].getPay()에서 에러가 발생한다.  
그래서 Employee에 getPay()를 추가해 준다.
```java
	public int getPay() {
		return 0;
	}
```
근데 위메서드는 의미가 없다. 상속관계를 전부 파악하고 있는 우리는 이 메서드의 의미를 알고있지만, 그렇지 않은사람이 이 클래스를 쓸때 getPay()를 쓰면 0이 리턴되는것을 이상하게 생각할 것이다. 그래서 추상클래스라는 문법을 만든것.  
```java
    public abstract int getPay();
```
물론 두 getPay()는 그닥 차이가 없어보인다. 그러나 abstract를 붙여줌으로써 개발자에게 강요하는 것이다. 구현하라고.  