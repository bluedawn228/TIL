# 4 제어자(modifier)
## 4.1 제어자란
제어자는 `클래스`, `변수` 또는 `메서드`의 선언부와 함께 사용되어 `부가적인 의미를 부여`한다. 제어자의 종류는 크게 **접근 제어자**와 **그 외의 제어자**로 나눌 수 있다.  
```
접근 제어자 : public, protected, default, private
그       외 : static, final, abstract, native, transient, synchronized, volatile, strictfp
```
제어자는 클래스나 멤버변수와 메서드에 주로 사용되며, 하나의 대상에 대해서 `여러 제어자를 조합하여 사용하는 것이 가능`하다.  
단, **접근 제어자**는 `한번에 네가지중 하나만 선택해서 사용할 수 있다.` 즉, 하나의 대상에 대해서 public과 private을 함께 사용할 수 없다는 것이다.  
참고 : 제어자들 간의 순서는 관계없지만 주로 접근 제어자를 제일 왼쪽에 놓는 경향이 있다.  

## 4.2 static - 클래스의, 공통적인
static은 클래스의 또는 공통적인의 의미를 가지고 있다. 인스턴스 변수는 하나의 클래스로부터 생성되었더라도 각기 다른 값을 유지하지만, 클래스 변수(static 멤버변수)는 인스턴스에 관계없이 같은 값을 갖는다. 그 이유는 하나의 변수를 모든 인스턴스가 공유하기 때문이다.  
static이 붙은 멤버 변수와 메서드, 그리고 초기화 블럭은 인스턴스가 아닌 클래스에 관계된 것이기 때문에 인스턴스를 생성하지 않고도 사용할 수 있다.  
`인스턴스 메서드와 static메서드`의 **근본적인 차이**는 `메서드 내에서 인스턴스 멤버를 사용하는가의 여부`에 있다!!!  
```
static이 사용될 수 있는 곳 - 멤버변수, 메서드, 초기화 블럭
```
```
제어자    대상      의미

static  멤버변수    - 모든 인스턴스에 공통적으로 사용되는 클래스 변수가 된다
                    - 클래스 변수는 인스턴스를 생성하지 않고도 사용 가능하다
                    - 클래스가 메모리에 로드될때 생성된다     

        메서드      - 인스턴스를 생성하지 않고도 호출이 가능한 static메서드가 된다
                    - static 메서드 내에서는 인스턴스 멤버들을 직접 사용할 수 없다
```
인스턴스 멤버를 사용하지 않는 메서드는 static을 붙여서 static메서드로 선언하는 것을 고려해보도록 하자. 가능하다면 static 메서드로 하는 것이 인스턴스를 생성하지 않고도 호출이 가능해서 더 편리하고 속도도 더 빠르다!  
참고 : static 초기화 블럭은 클래스가 메모리에 로드될 때 단 한번만 수행되며, 주로 클래스변수를 초기화하는데 주로 사용된다.  
```java
class StaticTest {
  static int width = 200;
  static int height = 120;

  static {
    // static 변수의 복잡한 초기화 수행
  }

  static int max( int a, int b) {
    return a > b ? a : b;
  }
}
```

## 4.3 final - 마지막의, 변경될수없는
final은 마지막의 또는 변경될수없는의 의미를 가지고 있으며 `거의 모든 대상에` 사용될 수 있다.  
변수에 사용되면 값을 변경할 수 없는 상수가 되며, 메서드에 사용되면 오버라이딩을 할 수 없게 되고, 클래스에 사용되면 자신을 확장하는 자손클래스를 정의하지 못하게 된다.  
```
final이 사용될 수 있는 곳 - 클래스, 메서드, 멤버변수, 지역변수
```
```
제어자   대상      의미

final   클래스    변경될수없는 클래스, 확장될 수 없는 클래스가 된다. 그래서 조상이 될수가 없다
        메서드    변경될수없는 메서드, 오버라이딩을 통해 재정의 될 수 없다
        멤버변수  변수 앞에 final이 붙으면 값을 변경할 수 없는 상수가 된다
        지역변수  마찬가지
```
참고 : 대표적인 final클래스로는 String과 Math가 있다  

```java
final class FinalTest {       // 조상이 될 수 없는 클래스
  final int MAX_SIZE = 10;    // 값을 변경할 수 없는 멤버변수(상수)

  final void getMaxSize() {   // 오버라이딩할 수 없는 메서드(변경불가)
    final int LV = MAX_SIZE;  // 값을 변경할 수 없는 지역변수(상수)
    return MAX_SIZE;
  }
}
```

**생성자를 이용한 final멤버 변수의 초기화**  
final이 붙은 변수는 상수이므로 일반적으로 선언과 동시에 초기화를 동시에 하지만, 인스턴스 변수의 경우 생성자에서 초기화되도록 할 수 있다.  
이 기능을 활용하면 각 인스턴스마다 final이 붙은 멤버변수가 다른 값을 갖도록 하는 것이 가능하다!  
만일 이것이 불가능하다면 클래스에 선언된 final이 붙은 인스턴스 변수는 모든 인스턴스에서 같은 값을 가져야만 할 것이다.  

예를 들어 카드의 경우, 각 카드마다 다른 종류와 숫자를 갖지만, 일단 카드가 생성되면 카드의 값이 변경되어서는 안된다. 52장의 카드 중에서 하나만 잘못 바꿔도 같은 카드가 2장이 되는 일이 생기기 때문이다. 그래서 카드의 값을 바꾸기 보다는 카드의 순서를 바꾸는 족이 더 안전한 방법이다.  
```java
public class Card {
  final int NUMBER;
  final String KIND;
  static int width = 100;
  static int heigth = 250;

  Card(String kind, int num) {
    KIND = kind;
    NUMBER = num;
  }

  Card() {
    this("HEART", 1);
  }

  @Override
  public String toString() {
    return KIND + " " + NUMBER;
  }

  public static void main(String[] args) {
    Card c = new Card("HEART", 10);
    //    c.NUMBER = 5;
    System.out.println(c.KIND);
    System.out.println(c.NUMBER);
    System.out.println(c);
  }
}
```

## 4.4 abstract - 추상의, 미완성의
abstract는 미완성의 의미를 가지고 있다. **메서드의 선언부만 작성하고** `실제 수행내용은 구현하지 않은` 추상메서드를 선언하는데 사용된다.  
그리고 클래스에 사용되어 `클래스내에 추상메서드가 존재한다는 것을` 쉽게 알 수 있게 한다. 보다 자세한 내용은 추상클래스에서 다룬다  
```
abstract가 사용될 수 있는 곳 - 클래스, 메서드
```
```
제어자     대상    의미

abstract  클래스  클래스 내에 추상메서드가 선언되있음을 의미한다
          메서드  선언부만 작성하고 구현부는 작성하지않은 추상메서드임을 알린다
```
추상 클래스는 아직 완성되지 않은 메서드가 존재하는 `미완성 설계도`이므로 **인스턴스를 생성할 수 없다.!!!!**   
```java
abstract class AbstractTest { // 추상클래스 : 추상메서를 포함한 클래스
  abstract void move(); // 추상메서드 : 구현부가 없는 메서드
}
```

꽤 드물지만 추상 메서드가 없는 클래스, 즉 완성된 클래스도 abstract를 붙여서 추상 클래스로 만드는 경우도 있다. 예를 들어, java.awt.event.WindowFocusListener는 아래와 같이 아무런 내용이 없는 메서들만이 정의되어 있다. 이런 클래스는 `인스턴스를 생성해봐야 할 수 있는 것이 아무것도 없다.` 그래서 인스턴스를 생성하지 못하게 클래스 앞에 제어자 abstract를 붙여놓은 것이다.  
```java
public abstract class WindowAdapter 
implements WindowListener, WindowStateListener, WindowFocusListener {
  public void windowOpened(WindowEvent e) { }
  public void windowClosing(WindowEvent e) { }
  public void windowClosed(WindowEvent e) { }
  public void windowIconified(WindowEvent e) { }
  ...
}
```
이 클래스 자체로는 쓸모가 없지만, 다른 클래스가 이 클래스를 상속받아서 일부의 원하는 메서드만 오버라이딩 해도 된다는 장점이 있다!  
만일 이 클래스가 없다면 아무런 내용도 없는 메서드를 잔뜩 오버라이딩해야한다. 아직 추상클래스와 인터페이스를 배우지 않았으니 이런경우도 있구나라고 가볍게 참고하라.  

## 4.5 접근 제어자(access modifier)
접근 제어자는 멤버 또는 클래스에 사용되어, 해당하는 멤버 또는 클래스를 외부에서 접근하지 못하도록 제한하는 역할을 한다.  
```
접근 제어자가 사용될 수 있는곳 - 클래스, 멤버변수, 메서드, 생성자

private   같은 클래스 내에서만 접근이 가능하다
default   같은 패키지 내에서만 접근이 가능하다
protected 같은 패키지 내에서, 그리고 다른 패키지의 자손 클래스에서 접근이 가능하다
public    접근 제한이 전혀 없다
```
![image](https://user-images.githubusercontent.com/68311318/121796998-3ac35400-cc58-11eb-9961-4c6bc06c1642.png)  
protected는 `패키지에 관계없이` 상속관계에 있는 자손클래스에서 접근할 수 있도록 하는 것이 제한 목적이지만, 같은 패키지 내에서도 접근이 가능하다. 그래서 protected가 deafult보다 접근 범위가 더 넓다.  
```
대상      사용가능한 접근 제어자

클래스    public, (default)
메서드    public protected, (default), private
멤버변수  메서드와 같다
지역변수  없음
```

**접근제어자를 이용한 캡슐화**  
클래스나 멤버, 주로 멤버에 접근 제어자를 사용하는 이유는 클래스의 내부에 선언된 데이터를 보호하기 위해서이다.  
데이터가 유효한 값을 유지하도록, 또는 비밀번호와 같은 데이터를 외부에서 함부로 변경하지 못하도록 하기 위해서는 외부로붙터의 접근을 제한하는 것이 필요하다.  
이것을 데이터 감추기(data hiding)이라고 하며, 객체지향개념의 캡슐화(encapsulation)에 해당하는 내용이다.  
또 다른 이유는 클래스 내에서만 사용되는, 내부 작업을 위해 임시로 사용되는 멤버변수나 부분작업을 처리하기 위한 메서드 등의 멤버들을 클래스 내부에 감추기 위해서이다.  
외부에서 접근할 필요가 없는 멤버들을 private로 지정하여 외부에 노출시키지 않음으로써 복잡성을 줄일 수 있다. 이 것 역시 캡슐화에 해당한다.  
```
접근 제어자를 사용하는 이유
- 외부로부터 데이터를 보호하기 위해서
- 외부에는 불필요한, 내부적으로만 사용되는, 부분을 감추기 위해서
```
만일 메서드 하나를 변경해야 한다고 가정했을때, 이 메서드의 접근 제어자가 public이라면 메서드를 변경한 후에 `오류가 없는지 테스트해야하는 범위가 넓다!`. 그러나 접근 제어자가 default라면 패키지 내부만 확인해 보면되고, private이면 클래스 하나만 살펴보면 된다. 이처럼 접근 제어자 하나가 때로는 상당한 차이를 만들어낼 수 있다. 접근 제어자를 적절히 선택해서 접근 범위를 최소화 하도록 노력하자.  
```java
public class Time {
  public int hour;
  public int minute;
  public int second;
}
```
```java
Time t = new Time();
t.hour = 25;
```
멤버변수 hour는 0보다 같거나 크고 24보다 작은 범위의 값을 가져야 하지만 위의 코드에서처럼 잘못된 값을 지정한다고 해도 이것을 막을 방법이 없다.  
이런 경우 멤버변수를 private이나 protected로 제한하고 멤버변수의 값을 읽고 변경할 수 있는 public메서드를 제공함으로써 간접적으로 멤버변수의 값을 다룰수있도록 하는 것이 바람직하다.  
```java
public class Time {
  private int hour;
  private int minute;
  private int second;

  public int getHour() {
    return hour;
  }
  public void setHour(int hour) {
    if (hour < 0 || hour > 23) return;
    this.hour = hour;
  }
  public int getMinute() {
    return minute;
  }
  public void setMinute(int minute) {
    if (minute < 0 || minute > 59) return;
    this.minute = minute;
  }
  public int getSecond() {
    return second;
  }
  public void setSecond(int second) {
    if (second < 0 || second > 59) return;
    this.second = second;
  }
}
```
만일 `상속을 통해 확장될 것이 예상되는 클래스`라면 멤버에 접근 제한을 주되 자손클래스에서 접근하는 것이 가능하도록 하기 위해 private대신 `protected`를 사용한다. `private이 붙은 멤버는 자손 클래스에서도 접근이 불가능하기 때문이다!`  
```java
public class TimeTest {
  public static void main(String[] args) {
    Time t = new Time(12, 35, 30);
    System.out.println(t);

    t.setHour(t.getHour() + 1);
    System.out.println(t);
  }
}

class Time {
  private int hour, minute, second;

  public Time(int hour, int minute, int second) {
    setHour(hour);
    setMinute(minute);
    setSecond(second);
  }

  public int getHour() {
    return hour;
  }
  public void setHour(int hour) {
    if (hour < 0 || hour > 23) return;
    this.hour = hour;
  }
  public int getMinute() {
    return minute;
  }
  public void setMinute(int minute) {
    if (minute < 0 || minute > 59) return;
    this.minute = minute;
  }
  public int getSecond() {
    return second;
  }
  public void setSecond(int second) {
    if (second < 0 || second > 59) return;
    this.second = second;
  }

  @Override
  public String toString() {
    return hour + ":" + minute + ":" + second;
  }
}
```
멤버변수를 private로 하고 이들을 다루기 위한 public 메서드를 추가했다. 메서드를 통한 접근만이 허용될 뿐이다.  
참고 : 하나의 소스파일(*.java)에는 public 클래스가 `단 하나만` 존재할 수 있으며, 소스파일의 이름은 반드시 public 클래스의 이름과 같아야한다.  

**생성자와 접근제어자**  
생성자에 접근제어자를 사용함으로써 인스턴스의 생성을 제한할 수 있다. 보통 생성자의 접근제어자는 클래스의 접근 제어자와 같지만, 다르게 지정할 수도 있다.  
생성자의 접근 제어자를 private로 지정하면, 외부에서 생성자에 접근할 수 없으므로 인스턴스를 생성할 수 없게 된다. 그래도 클래스 내부에서는 인스턴스를 생성할 수 있다.  
```java
class Singleton {
  private Singleton() {
    ...
  }
}
```
대신 `인스턴스를 생성해서 반환해주는 public 메서드`를 제공함으로써 외부에서 이 클래스의 인스턴스를 사용하도록 할 것이다. 이 메서드는 public인동시에 `static`이어야 한다.  
```java
class Singleton {
  ...
  private static Singleton s = new Singleton();
  // getInstance()에서 사용될 수 있도록 인스턴스가 미리 생성되어야 하므로 static이어야 한다
  private Singleton() {
    ...
  }

  public static Singleton getInstance() {
    return s;
  }
  ...
}
```
이처럼 생성자를 통해 직접 인스턴스를 생성하지 못하게 하고 public메서드를 통해 인스턴스에 접근하게 함으로써 `사용할 수 있는 인스턴스의 개수를 제한할 수 있다.!!`  

또 한가지, 생성자가 private인 클래스는 다른 클래스의 `조상이 될 수 없다.` 왜냐하면 자손 클래스의 인스턴스를 생성할때 조상클래스의 생성자를 호출해야만 하는데, 생성자의 접근 제어자가 private이므로 자손클래스에서 호출하는 것이 불가능하기 때문이다!  
그래서 클래스 앞에 final을 더 추가하여 상속할 수 없는 클래스라는 것을 알리는 것이 좋다.  
Math 클래스는 몇개의 상수와 static메서드만으로 구성되어 있기 때문에 `인스턴스를 생성할 필요가 없다.` 그래서 외부로부터의 불필요한 접근을 막기 위해 다음과 같이 생성자의 접근 제어자를 private로 지정하였다.  
```java
public final class Math {
  private Math() { }
  ...
}
```
```java
final class Singleton {
  private static Singleton s = new Singleton();

  private Singleton() {

  }

  public static Singleton getInstance() {
    if(s == null) {
      s = new Singleton();
    }
    return s;
  }
}

class SingleTon {
  public static void maint(String args[]) {
    Singleton s = Singleton.getInstance();
  }
}
```
## 4.6 제어자(modifier)의 조합
```
대상      사용가능한 제어자

클래스    public, (default), final, abstract
메서드    모든 접근 제어자, final, abstract, static
멤버변수  모든 접근 제어자, final, static
지역변수  final
```
주의사항
1. 메서드에 static과 abstract를 함께 사용할 수 없다  
static 메서드는 몸통이 잇는 메서드에만 사용할 수 있기 때문이다  
2. 클래스에 abstract와 final을 동시에 사용할 수 없다  
클래스에 사용되는 final은 클래스를 확장할 수 없다는 의미이고 abstract는 `상속을 통해서 완성되어야 한다`는 의미이므로 서로 모순되기 때문이다.  
3. abstract메서드의 접근제어자가 private일 수 없다  
abstract메서드는 자손클래스에서 구현해주어야 하는데 접근 제어자가 private이면 자손 클래스에서 접근할 수 없기 때문이다.  
4. 메서드에 private과 final을 같이 사요할 필요는없다  
접근 제어자가 private인 메서드는 오버라이딩될 수 없기 때문이다. 이 둘중 하나만 사용해도 의미가 충분하다.  
