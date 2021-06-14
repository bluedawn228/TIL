# 8 내부 클래스(inner class) 
내부 클래스는 클래스 내에 선언된다는 점을 제외하고는 `일반적인 클래스와 다르지 않다.` 다만 앞으로 배우게될 내부클래스의 몇 가지 특징만 잘 이해하면 실제로 활용하는데 어려움이 없을 것이다.  
내부클래스는 사용빈도가 높지 않으므로 내부 클래스의 기본원리와 특징을 이해하는 정도까지만 학습해도 충분하다. 실제로는 발생할지 않을 경우까지 이론적으로 만들어 내서 고민하지말자.  

## 8.1 내부클래스란
내부 클래스는 클래스 내에 선언된 클래스이다. 클래스에 다른 클래스를 선언하는 이유는 간단하다. 두 클래스가 서로 긴밀한 관계에 있기 때문이다.  
한클래스를 다른 클래스의 내부 클래스로 선언하면 `1. 두 클래스의 멤버들간에 서로 쉽게 접근할 수 있다`는 장점과 `2. 외부에는 불필요한 클래스를 감춤으로써 코드의 복잡성을 줄일수 있다(캡슐화)`는 장점을 얻을 수 있다.  

```java
class A {
  ...
} 
class B {

}
```
얘를
```java
class A { // 외부 클래스
  ...
  class B { // 내부 클래스
    ...
  }
  ...
}
```
얘처럼 바꿔보자. 두개의 독립적인 클래스였던것이, B가 A의 내부클래스가 된다.  
이때 내부클래스인 B는 외부클래스인 A를 제외하고는 `다른 클래스에서 잘 사용되지 않는것이어야한다`!  

## 8.2 내부클래스의 종류와 특징
내부 클래스의 종류는 `변수의 선언위치`에 따른 종류와 같다. 내부 클래스는 마치 변수를 선언하는 것과 같은 위치에 선언할 수 있으며, 변수의 선언위치에 따라 인스턴스 변수, 클래스변수, 지역변수로 구분되는 것과 같이 내부 클래스도 선언위치에 따라 다음과 같이 구분되어 진다. 내부 클래스의 유효범위와 성질이 변수와 유사하므로 서로 비교해보면 이해하는데 많은 도움이 된다.  
참고 : 초기화 블럭 관련내용은 앞의 내용을 참고  

인스턴스 클래스 : 외부 클래스의 멤버변수 선언위치에 선언하며, 외부 클래스의 `인스턴스 멤버처럼` 다루어 진다. 주로 외부 클래스의 `인스턴스 멤버들과 관련된 작업에 사용될 목적`으로 선언된다.  
스태틱 클래스 : 외부 클래스의 멤버변수 선언위치에 선언하며, 외부 클래스의 `static멤버처럼` 다루어 진다. 주로 외부 클래스의 `static 멤버`, **특히 static 메서드에서 사용될 목적**으로 선언된다.  
지역 클래스 : 외부 클래스의 `메서드`나 **초기화 블럭** 안에 선언하며, `선언된 내부에서만` 사용할 수 있다.  
익명 클래스(anonymous class) : 클래스의 선언과 객체의 생성을 `동시에` 하는 이름없는 클래스(일회용)  

## 8.3 내부 클래스의 선언
```java
class Outer {
  class InstanceInner { }
  static class StaticInner { }

  void myMethod() {
    class LocalInner { }
  }
}
```
외부(Outer) 클래스에 3개의 내부 클래스를 선언했다. 각 내부 클래스의 선언위치에 따라 `같은 선언위치의 변수와 동일한` **1. 유효범위(scope)**와 **2. 접근성**을 갖는다.  

## 8.4 내부 클래스의 제어자와 접근성
인스턴스 클래스와 스태틱클래스는 외부 클래스의 멤버변수(인스턴스변수와 클래스변수)와 같은 위치에 선언되며, 또한 `멤버면수와 같은 성질을 갖는다`! 따라서 내부클래스가 외부클래스의 멤버와 같이 간주되고 인스턴스 멤버와 static 멤버간의 규칙이 내부 클래스에도 똑같이 적용된다.  
```java
class Outer {
  private int iv = 0;
  protected static int cv = 0;

  void myMethod() {
    int lv = 0;
  }
}
```
```java
class Outer {
  private class InstanceInner { }
  protected static class StaticInner{ }

  void myMethod() {
    class LocalInner { }
  }
}
```
그리고 내부 클래스도 클래스이기 때문에 abstract나 final 같은 제어자를 사용할 수 있을뿐만 아니라, 멤버변수들 처럼 private, protected과 접근제어자도 사용이 가능하다.  
```java
public class Test {
  class InstanceInner {
    int iv = 100;
    //    static int cv = 100; // 에러! static 변수를 선언할 수 없다!
    final static int CONST = 100; //final static은 상수!이므로 허용
  }

  static class StaticInner {
    int iv = 200;
    static int cv = 200; // static 클래스만 static 멤버를 정의할 수 있다!
  }

  void MyMethod() {
    class LocalInner {
      int iv = 300;
      //      static int cv = 300; // 에러! static 변수를 선언할 수 없다!
      final static int CONST = 300; // final static은 상수이므로 허용
    }
  }

  public static void main(String[] args) {
    System.out.println(InstanceInner.CONST);
    System.out.println(StaticInner.cv);
  }
}
```
참고 : final이 붙은 변수는 상수(constant)이기 때문에 어떤 경우라도 static을 붙이는 것이 가능하다!  

내부 클래스 중에서 스태틱 클래스만 static 멤버를 가질 수 있다. 드문 경우지만 내부 클래스에 static 변수를 선언해야한다면 스태틱 클래스로 선언해야 한다!  
다만 final과 static이 동시에 붙은 변수는 상수(constant)이므로 모든 내부 클래스에서 정의가 가능하다.  
```java
public class Test {
  class InstanceInner { }
  static class StaticInner { }

  // 인스턴스 멤버간에는 서로 직접 접근(사용)이 가능하다!
  InstanceInner iv = new InstanceInner();
  // static 멤버간에는 서로 직접 접근이 가능하다
  static StaticInner cv = new StaticInner();

  static void staticMethod() {
    // static 멤버는 인스턴스 멤버에 직접 접근할 수 없다.
    // No enclosing instance of type Test is accessible. 
    // Must qualify the allocation with an enclosing instance of type Test 
    // (e.g. x.new A() where x is an instance of Test).
    // InstanceInner obj1 = new InstanceInner();
    StaticInner obj2 = new StaticInner();

    // 굳이 접근하려면 아래와 같이 객체를 생성해야한다
    // 인스턴스 클래스는 외부클래스를 먼저 생성해야만 생성할 수 있다!
    Test outer = new Test();
    InstanceInner obj1 = outer.new InstanceInner();
  }

  void instanceMethod() {
    // 인스턴스 메서드에서는 인스턴스멤버와 static멤버 모두 접근 가능하다.
    InstanceInner obj1 = new InstanceInner();
    StaticInner obj2 = new StaticInner();

    // 메서드내에 지역적으로 선언된 내부클래스는 외부에서 접근할 수 없다
    //    LocalInner lv = new LocalInner();
  }

  public static void main(String[] args) {
    class LocalInner { }
    LocalInner lv = new LocalInner();
  }
}
```
인스턴스 멤버는 같은 클래스에 있는 인스턴스멤버와 static 멤버 모두 직접 호출이 가능하지만, static 멤버는 인스턴스 멤버를 직접 호출할 수 없는 것처럼, 인스턴스 클래스는 외부 클래스의 인스턴스 멤버를 객체 생성없이 바로 사용할수있지만, 스태틱 클래스는 외부 클래스의 인스턴스 멤버를 객체생성없이 사용할 수 없다.  
마찬가지로 인스턴스 클래스는 스태틱 클래스의 멤버들을 객체생성없이 사용할 수 있지만, 스태틱 클래스에서는 인스턴스 클래스의 멤버들을 객체생성없이 사용할 수 없다.  

```java
public class Test {
  private int outerIv = 0;
  static int outerCv = 0;

  class InstanceInner {
    int iiv = outerIv; // 외부 클래스의 private멤버도 접근 가능하다
    int iiv2 = outerCv;
  }

  static class StaticInner {
    // 스태틱 클래스는 외부클래스의 인스턴스 멤버에 접근할 수 없다
    // Cannot make a static reference to the non-static field outerIv
    //    int siv = outerIv;
    static int scv = outerCv;
  }

  void myMethod() {
    int lv = 0;
    final int LV = 0; // JDK1.8부터 final 생략 가능

    class LocalInner {
      int liv = outerIv;
      int liv2 = outerCv;
      // 외부 클래스의 지역변수는 final이 붙은 변수(상수)만 접근 가능하다
      int liv3 = lv; // 에러!! JDK1.8부터 에러아님
      int liv4 = LV; // OK
    }
  }
}
```
내부 클래스에서 외부 클래스의 변수들에 대한 접근성을 보여주는 예제이다. 인스턴스 클래스는 외부클래스의 인스턴스 멤버이기 때문에 인스턴스 변수 outerIv와 static 변수 outerCv를 모두 사용할 수 있다. 심지어는 outerIv의 접근 제어자가 private일지라도 사용가능하다!  

스태틱 클래스는 외부클래스의 static멤버이기 때문에 외부 클래스의 인스턴스 멤버인 outerIv와 InstsanceInner를 사용할 수 없다. 단지 static 멤버인 outerCv만을 사용할 수 있다.  

지역클래스는 외부 클래스의 인스턴스멤버와 static멤버를 모두 사용할  수 있으며, 지역 클래스가 포함된 메서드에 정의된 지역변수도 사용할 수 있다. 단, final이 붙은 지역변수만 접근 가능한데 그 이유는 메서드가 수행을 마쳐서 지역변수가 소멸된 시점에도, 지역 클래스의 인스턴스가 소멸된 지역변수를 참조하려는 경우가 발생할 수 있기 때문이다!  

JDK1.8 부터 지역클래스에서 접근하는 지역변수 앞에 final을 생략할 수 있게 바뀌었다. `대신 컴파일러가 자동으로 붙여준다!!` 즉, 편의상 final을 생략할 수 있게 한것일 뿐 `해당변수의 값이 바뀌는 문장이 있으면` 컴파일 에러가 발생한다!  

```java
class Outer {
  class InstanceInner {
    int iv = 100;
  }

  static class StaticInner {
    int iv = 200;
    static int cv = 300;
  }

  void myMethod() {
    class LocalInner {
      int iv = 400;
    }
  }
}

public class Test {
  public static void main(String[] args) {
    // 인스턴스클래스의 인스턴스를 생성하려면
    // 외부클래스의 인스턴스를 먼저 생성해야한다
    Outer oc = new Outer();
    Outer.InstanceInner ii = oc.new InstanceInner();

    System.out.println("li.iv : " + ii.iv);
    System.out.println("Outer.Staticinner.cv : " + Outer.StaticInner.cv);

    // 스태틱 내부클래스의 인스턴스는 외부 클래스를 먼저 생성하지 않아도 된다.
    Outer.StaticInner si = new Outer.StaticInner();
    System.out.println("si.iv : " + si.iv);
  }
}
```
외부 클래스가 아닌 다른 클래스에서 내부 클래스를 생성하고 내부 클래스의 멤버에 접근하는 예제이다. 실제로 이런 경우가 발생햇다는 것은 내부 클래스로 선언해서는 안되는 클래스를 내부 클래스로 선언했다는 의미이다! 참고로만 봐두고 가볍게 넘어가도록 하자. 참고로 컴파일 시 생성되는 클래스 파일은 다음과 같다.  
```
Test.class
outer.class
Outer$InstanceInner.class
Outer$StaticInner.class
Outer$1LocalInner.class
```
컴파일했을 때 생성되는 파일명은 '외부클래스명$내부클래스명.class'형식으로 되어 있다. 다만 서로 다른 메서드 내에서는 같은 이름의 지역변수를 사용하는 것이 가능한 것 처럼, 지역 내부 클래스는 다른 메서드에 같은 이름의 내부 클래스가 존재할 수 있기 때문에 내부 클래스명 앞에 숫자가 붙는다.  

```java
class Outer {
  void myMethod() {
    int lv = 0;
  }

  void myMethod2() {
    int lv = 0;
  }
}
```
<=>
```java
class Outer {
  void myMethod() {
    class LocalInner { }
  }

  void myMethod2() {
    class LocalInner { }
  }
}
```
만일 두번째 코드를 컴파일 하면 다음과 같은 클래스 파일이 생성될 것이다. 
```
Outer.class
Outer$1LocalInner.class
Outer$2LocalInner.class
```

```java
class Outer {
  int value = 10; // Outer.this.value
  class Inner {
    int value = 20; // this.value

    void method1 () {
      int value = 30;
      System.out.println("value : " + value);
      System.out.println("this.value : " + this.value);
      System.out.println("Outer.this.value : " + Outer.this.value);
    }
  }
}

public class Test {
  public static void main(String[] args) {
    Outer outer = new Outer();
    Outer.Inner inner = outer.new Inner();
    inner.method1();
  }
}
```
위의 예제는 내부 클래스와 외부 클래스에 선언된 변수의 이름이 `같을 때` 변수 앞에 this 또는 외부클래스명.this를 붙여서 서로 구별할 수 있다는 것을 보여준다.  

## 8.5 익명 클래스
클래스의 선언과 객체의 생성을 동시에 하기 때문에 단 한번만 사용될 수 있고 오직 하나의 객체만을 생성할 수 있는 일회용 클래스이다.  
```
new 조상클래스이름() {
  // 멤버 선언
}
또는
new 구현인터페이스이름() {
  // 멤버 선언
}
```
이름이 없기 때문에 `생성자도 가질수 없으며` **조상클래스**의 이름이나 **구현하고자 하는 인터페이스**의 이름을 사용해서 정의하기 때문에 하나의 `클래스로 상속받는 동시에 인터페이스를 구현하거나` `둘이상의 인터페이스를 구현할 수 없다.` 오로지 **단 하나**의 클래스를 상속받거나 단 하나의 인터페이스 만을 구현할 수 있다.  

인스턴스 클래스를 익명 클래스로 바꾸는 연습을 몇번만 해보면 곧 익숙해 질것이다.  
```java
class Test {
  Object iv = new Object() { void method( ) { } }; // 익명 클래스
  static Object cv = new Object() { void method() { } }; // 익명 클래스
  
  void myMethod() {
    Object lv = new Object() { void method() { } }; // 익명 클래스
  }
}
```
위의 예제는 단순히 익명 클래스의 사용 예를 보여준 것이다. 이 예제를 컴파일 하면 다음과 같이 4개의 클래스 파일이 생성된다.
```
Test.class
Test$1.class
Test$2.class
Test$3.class
```

```java
import java.awt.Button;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Test {
  public static void main(String[] args) {
    Button b = new Button("Start");
    b.addActionListener(new EventHandler());
  }
}

class EventHandler implements ActionListener {
  @Override
  public void actionPerformed(ActionEvent e) {
    System.out.println("ActionEvent occurred!!!");
  }
}
```
위 예제를 실행하면 화면에 아무거도 나타나지 않은채 종료된다. 단지 익명 클래스로 변환하는 예를 보여주기 위한 것일 뿐이다. 
```java
import java.awt.Button;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Test {
  public static void main(String[] args) {
    Button b = new Button("Start");
    b.addActionListener(new ActionListener() {
      @Override
      public void actionPerformed(ActionEvent e) {
        System.out.println("ActionEvent occurred!!!");
      }
    });
  }
}
```
먼저 두개의 독립된 클래스를 작성한 다음에, 다시 익명 클래스를 이용하여 변경하면 보다 쉽게 코드를 작성할 수 있을 것이다.
참고 : 연습문제 풀어봐라(http://cafe.naver.com/javachobostudy.cafe)에서 PDF파일 제공  
