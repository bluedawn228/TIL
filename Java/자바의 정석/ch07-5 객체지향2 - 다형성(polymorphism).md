# 5 다형성(polymorphism)
## 5.1 다형성이란
상속, 다형성은 객체지향 개념의 중요한 특징들이다. 다형성은 상속과 깊은 관계가 있다.  
객체지향개념에서 다형성이란 '여러 가지 형태를 가질 수 있는 능력'을 의미하며, 자바에서는 한 타입의 참조변수로 여러 차입의 객체를 참조할 수 있도록 함으로써 다형성을 프로그램적으로 구현하였다.  
이름 좀더 구체적으로 말하면 `조상클래스 타입의 참조 변수로 자손클래스의 인스턴스를 참조할 수 있도록 하였다`는 것이다.  
```java
class TV {
  boolean power;
  int channel;

  void power() {power = !power;}
  void channelUp() {++channel;}
  void channelDown() {--channel;}
}

class CaptionTv extends Tv {
  String text; // 캡션을 보여주기 위한 문자열
  void caption() { /*내용생략*/}
}
```
Tv클래스와 CaptionTv클래스가 이와 같이 정의되어 있을때, 두 클래스간의 관계를 그림으로 나타내면 다음과 같다.  
![image](https://user-images.githubusercontent.com/68311318/121799097-04400600-cc65-11eb-959e-404930db069d.png)  
```java
Tv = new Tv();
CaptionTv c = new CaptionTv();
```
지금까지 우리는 생성된 인스턴스를 다루기 위해서, 인스턴스의 타입과 일치하는 타입의 참조변수만을 사용했다. 즉, Tv인스턴스를 다루기 위해서는 Tv타입의 참조변수를 사용하고, CaptionTv인스턴스를 다루기 위해서는 CaptionTv타입의 참조변수를 사용했다.  
이처럼 인스턴스의 타입과 참조변수의 타입이 일치하는 것이 보통이지만, Tv와 CaptionTv클래스가 서로 상속관계에 있을 경우, 다음과 같이 조상 클래스 타입의 참조변수로 자손 클래스의 인스턴스를 참조하도록 하는 것도 가능하다.  
```java
Tv t = new CaptionTv(); // 조상 타입의 참조변수로 자손 인스턴스를 참조
```
그러면 이제 인스턴스를 같은 타입의 참조변수로 참조하는 것과 조상타입의 참조변수로 참조하는 것은 어떤 차이가 있는지에 대해서 알아보도록 하자.  
```java
CaptionTv c = new CaptionTv();
Tv        t = new CaptionTv();
```
인스턴스가 CaptionTv타입이라 할지라도, 참조 변수 t로는 CaptionTv인스턴스의 `모든 멤버`를 사용할수 없다!  
Tv타입의 참조변수로는 CaptionTv인스턴스 중에서 `Tv클래스의 멤버들(상속받은 멤버 포함)`만 사용할 수 있다. 따라서 생성된 CaptionTv인스턴스의 멤버 중에서 Tv클래스에 정의되지 않은 멤버, text와 caption()은 참조변수 t로 사용이 불가능하다. 즉, t.text또는 t.caption()와 같이 할 수 없다는 것이다. `둘다 같은 타입의 인스턴스지만` **참조변수의 타입에 따라** 사용할 수 있는 멤버의 개수가 달라진다.  
![image](https://user-images.githubusercontent.com/68311318/121799284-3140e880-cc66-11eb-8999-a932d9ac0491.png)  
참고 : 실제로는 모든 클래스의 최고조상인 Object클래스로부터 상속받은 부분도 포함되어야하지만 간단히 하기위해 생략했다.  
반대로 아래와 같이 자손타입의 참조변수로 조상타입의 인스턴스를 참조하는 것은 가능할까?  
```java
CaptionTv c = new Tv();
```
그렇지 않다. 컴파일 하면 에러가 발생한다. 이유는 실제 인스턴스인 Tv의 멤버 개수보다 참조변수 c가 사용할 수 있는 멤버 개수가 더 많기 때문이다.  그래서 이를 허용하지 않는다.  
CaptionTv클래스에는 text와 caption()이 정의되어 있으므로 참조변수 c로는 c.text, c.caption()과 같은 방식으로 c가 참조하고 있는 인스턴스에서 text와 caption()을 사용하려 할 수 있다.  
하지만, c가 참조하고 있는 인스턴스는 Tv타입이고, Tv타입의 인스턴스에는 text와 caption()이 존재하지 않기 때문에 이들을 사용하려 하면 문제가 발생한다.  

그래서, 자손타입의 참조변수로 조상타입의 인스턴스를 참조하는 것은 존재하지않는 멤버를 사용하고자 할 가능성이 있으므로 허용하지 않는것이다. 참조변수가 사용할 수 있는 멤버의 개수는 인스턴스의 멤버 개수보다 같거나 적어야 한다.  
참고 : 클래스는 상속을 통해서 확장될 수는 있어도 축소될 수는 없어서, 조상 인스턴스의 멤버 개수는 자손 인스턴스의 멤버 개수보다 항상 적거나 같다.  

`참조변수의 타입이` 참조변수가 참조하고 있는 인스턴스에서 `사용할 수 있는 멤버의 개수를 결정`한다는 사실을 이해하는 것은 매우 중요하다.  
그렇다면, 인스턴스의 타입과 일치하는 참조변수를 사용하면 인스턴스의 멤버들ㅇ르 모두 사용할 수 있을텐데 왜 조상타입의 참조변수를 사용해서 인스턴스의 일부 멤버만을 사용하도록 할까?  
이에 대한 답은 앞으로 배우게된다. 지금은 조상타입의 참조변수로도 자손 클래스의 인스턴스를 참조할 수 있다는 것과 그 차이에 대해서만 이해하면 된다.  
참고 : 모든 참조변수는 null 또는 4byte 주소값이 저장되며, 참조변수의 타입은 참조할 수 있는 객체의 종류와 사용할 수 있는 멤버의 수를 결정한다.  
```
조상타입의 참조변수로 자손타입의 인스턴스를 참조할 수 있다.
반대로 자손타입의 참조변수로 조상타입의 인스턴스를 참조할 수 없다.
```

## 5.2 `참조변수`의 형변환
기본형 변수와 같이 `참조형 변수`도 형변환이 가능하다. 단, 서로 **상속관계**에 있는 클래스 사이에서만 가능하기 때문에 `자손타입의 참조변수를 조상타입의 참조변수로`, `조상타입의 참조변수를 자손타입의 참조변수로`의 형변환만 가능하다.  
참고 : 바로 윗 조상이나 자손이 아닌, 조상의 조상으로도 형변환이 가능하다. 따라서 모든 참조변수는 모든 클래스의 조상인 Object클래스 타입으로 형변환이 가능하다.  
기본형 변수의 형변환에서 작은 자료형에서 큰 자료형의 형변환은 `생략`이 가능하듯이, 참조형 변수의 형변환에서는 자손타입의 참조변수를 조상타입으로 형변환하는 경우에는 형변환을 생략할 수 있다.  
```
자손타입 -> 조상타입(Up-casting) : 형변환 생략가능
자손타입 <- 조상타입(Down-casting) : 형변환 생략불가
```
참조변수간의 형변환 역시 `캐스트 연산자`를 사용하며, 괄호()안에 반환하고자 하는 타입의 이름(클래스명)을 적어주면 된다.  
```java
class Car {
  String color;
  int door;
  void drive() {
    System.out.println("drive, Brrrr-");
  }
  void stop() {
    System.out.println("stop!!!");
  }
}

class FireEngine extends Car { // 소방차
  void water() { // 물뿌리는 기능
    System.out.println("water!!!");
  }
}

class Ambulance extends Car {
  void siren() {
    System.out.println("siren~~~");
  }
}
```
![image](https://user-images.githubusercontent.com/68311318/121799666-559dc480-cc68-11eb-8478-b36206b8b5f7.png)  
참고 : 이처럼 클래스 간의 상속관계를 그림으로 나타내 보면, 형변환의 가능여부를 쉽게 확인할 수 있다.  

자바에서는 조상 자식관계만 있지 형제관계는 없다. 따라서 Car타입의 참조변수와 FireEngine타입의 참조변수 그리고 Car타입의 참조변수와 Ambulance타입의 참조변수간에는 서로 형변환이 가능하지만, FireEngine타입의 참조변수와 Ambulance타입의 참조변수 간에는 서로 형변환이 가능하지 않다.  

```java
FireEngine f;
Ambulance a;
a = (Ambulance) f; //에러. 상속관계가 아닌 클래스간의 형변환 불가
f = (FireEngine) a; //에러. 상속관계가 아닌 클래스간의 형변환 불가
```
먼저 Car타입 참조변수와 FireEngine 타입 참조변수 간의 형변환을 예로 들어봐자  
```java
Car car = null;
FireEngine fe = new FireEngine();
FireEngine fe2 = null;

car = fe; // car = (Car)fe; 에서 형변환 생략됨. 업캐스팅
fe2 = (FireEngine) car; // 형변환을 생략불가. 다운캐스팅
```
참조변수 car와 fe의 타입이 서로 다르기 때문에, `대입연산(=)이 수행되기전에` 형변환을 수행하여 두 변수간의 타입을 맞춰줘야 한다!  
그러나 자손타입의 참조변수를 조상타입의 참조변수에 할당할 경우 형변환을 `생략`할 수 있다.  
반대로 조상타입의 참조변수를 자손타입의 참조변수에 저장할 경우 형변환을 생략할 수 없다. 명시적으로 형변환을 해줘야한다.  
(car= fe; 에서 fe가 car의 자손이지만 fe는 사용할 수 있는 멤버의 개수가 car이 사용할 수 잇는 것보다 많다)  

참고로 형변환을 생략할 수 있는 경우와 생략할 수 없는 경우에 대한 이유를 설명하자면 다음과 같다.  
Car타입의 참조변수 c가있다고 가정하자. 참조변수 c가 참조하고 있는 인스턴스는 아마도 Car인스턴스이거나 자손인 FireEngine인스턴스 일것이다.  
Car타입의 참조변수 c를 Car타입의 조상인 Object타입의 참조변수로 형변환 하는 것은 참조변수가 다룰 수 있는 멤버의 개수가 실제 인스턴스가 갖고 있는 멤버의 개수보다 적을 것이 분명하므로 문제가 되지 않는다. 그래서 형변환을 생략할 수 있도록 한 것이다.  

하지만, Car 타입의 참조변수 c를 자손인 FireEngine타입으로 변환하는 것은 참조변수가 다룰 수 있는 멤버의 개수를 늘이는 것이므로, 실제 인스턴스의 멤버 개수보다 참조변수가 사용할 수 있는 멤버의 개수가 더 많아지므로 문제가 발생할 가능성이 있다.  

그래서 자손타입으로의 형변환은 생략할 수 없으며, **형변환을 수행하기 전에** `instanceof연산자`를 사용해서 참조변수가 참조하고 잇는 실제 인스턴스의 타입을 확인하는 것이 `안전`하다.  

형변환은 참조변수의 타입을 변환하는 것이지 인스턴스를 변환하는 것은 아니기 때문에 참조변수의 형변환은 `인스턴스에 아무런 영향을 미치지 않는다.`  
단지 참조변수의 형변환을 통해서, 참조하고 있는 인스턴스에서 사용할 수 있는 `멤버의 범위(개수)를 조절하는 것 뿐`이다.  
전에 예로 든 Tv t = new CaptionTv();도 Tv t = (Tv)new CaptionTv();의 생략된 형태이다. 이해가 잘 안간다면, Tv t = (Tv)new CaptionTv();는 아래의 두 줄을 간략히 한 것이라고 생각하면 이해하기 쉽다.  
```java
CaptionTv c = new CaptionTv();
Tv t = (Tv)c;
```
```java
public class Test {
  public static void main(String[] args) {
    Car car = null;
    FireEngine fe = new FireEngine();
    FireEngine fe2 = null;

    fe.water();
    car = fe;
    //    car.water();
    fe2 = (FireEngine)car;
    fe2.water();
  }
}
class Car {
  String color;
  int door;

  void drive() {
    System.out.println("dirve, Brrr-");
  }
  void stop() {
    System.out.println("stop!!");
  }
}
class FireEngine extends Car {
  void water() {
    System.out.println("water!!");
  }
}
```
```java
class Test {
  public static void maint(String args[]) {
    Car car = new Car();
    Car car2 = null;
    FireEngine fe = null;

    car.drive();
    fe = (FireEngine)car; // 컴파일은 Ok. 실행은 에러발생
    fe.drive();
    car2 = fe;
    car2.drive();
  }
}
```
```
실행결과 : 
dirve, Brrr-
Exception in thread "main" java.lang.ClassCastException: class Car cannot be cast to class FireEngine (Car and FireEngine are in unnamed module of loader 'app')
	at Test.main(Test.java:8)
```
이 예제는 컴파일은 성공하지만, 실행 시 에러가 발생한다. fe = (FireEngine)car;에서 에러가 발생하며, 발생이유는 형변환에 오류가 있기 때문이다. 캐스트 연산자를 이용해서 조상타입의 참조변수를 자손타입의 참조변수로 형변환한 것이기 때문에 문제가 없어 보이지만, 문제는 참조변수 car가 참조하고 있는 인스턴스가 Car타입의 인스턴스라는데 있다. 전에 배운 것처럼 조상타입의 인스턴스를 자손타입의 참조변수로 참조하는 것은 허용되지 않는다.  

위의 예제에서 Car car = new Car();를 Car car = new FireEngine();와 같이 변경하면, 컴파일할 때 뿐만 아니라 실행할 때도 에러가 발생하지 않을 것이다.  
컴파일 시에는 참조변수간의 타입만 체크하기 때문에 실행 시 생성될 인스턴스의 타입에 대해서는 전혀 알지 못한다. 그래서 컴파일 시에는 문제가 없었지만, 실행 시에는 에러가 발생하여 비정상적으로 종료된 것이다.  
```
서로 상속관계에 있는 타입간의 형변환은 양방향으로 자유롭게 수행될 수 있으나, 
참조변수가 가리키는 인스턴스의 자손타입으로 형변환은 허용되지 않는다.
그래서 참조변수가 가리키는 인스턴스의 타입이 무엇인지 확인하는 것이 중요하다.  
```

## 5.3 instanceof 연산자
참조변수가 참조하고 있는 인스턴스의 실제 타입을 알아보기 위해 instanceof연산자를 사용한다. 주로 `조건문`에 사용되며, instanceof의 왼쪽에는 참조변수를 오른쪽에는 타입(클래스명)이 피연산자로 위치한다. 그리고 연산의 결과로 boolean값인 true와 false중의 하나를 반환한다.  
instanceof를 이용한 연산결과로 `true`를 얻었다는 것은 `참조변수가 검사한 타입으로!!!` **형변환이 가능하다**는 것을 뜻한다.  
참고 : 값이 null인 참조변수에 대해 instanceof연산을 수행하면 false를 결과로 얻는다.  
```java
void doWork(Car c) {
  if (c instanceof FireEngine) {
    FireEngine fe = (FireEngine)c; // 위에가 true면 바로 (FireEngine)이렇게 붙여주면됨
    )
    fe.water();
    ...
  } else if( c instanceof Ambulance) {
    Ambulance a = (Ambulance)c; // 여기도 마찬가지
    a.siren();
    ...
  }
}
```
위의 코드는 Car타입의 참조변수 c를 매개변수로 하는 메서드이다. 이 메서드가 호출될 때, 매개변수로 Car클래스 또는 그 자손 클래스의 인스턴스를 넘겨받겠지만 메서드 내에서는 정확히 어떤 인스턴스인지 알 길이 없다. 그래서 instanceof연산자를 이용해서 참조변수 c가 가리키고 있는 인스턴스의 타입을 체크하고, 적절히 형변환한 다음에 작업을 해야한다.  
조상타입의 참조변수로 자손타입의 인스턴스를 참조할 수 있기 때문에, 참조변수의 타입과 인스턴스의 타입이 항상 일치하지는 않는다는 것을 배웠다. 실제 인스턴스와 같은 타입의 참조변수로 형변환을 해야만 인스턴스의 모든 멤버들을 사용할 수 있다.  
```java
class Test {
  public static void main(String args[]) {
    FireEngine fe = new FireEngine();

    if(fe instanceof FireEngine) {
      System.out.println("This is a FireEngine instance");
    }

    if(fe instanceof Car) {
      System.out.println("This is a Car instance");
    }

    if(fe instanceof Object) {
      System.out.println("This is a Object instance");
    }

    System.out.println(fe.getClass().getName());// 클래스의 이름을 출력
  }
}
class Car {}
class FireEngine extends Car {}
```
실행결과
```
This is a FireEngine instance
This is a Car instance
This is a Object instance
FireEngine
```
생성된 인스턴스는 FireEngine타입인데도, Object타입과 Car타입의 instanceof연산에서도 true를 결과로 얻었다. 그 이유는 FireEngine클래스는 Object 클래스와 Car클래스의 자손클래스이므로 조상의 멤버들을 `상속`받았기 때문에, FireEngine인스턴스는 Object인스턴스와 Car인스턴스를 `포함`하고 있는 셈이기 때문이다!!!!!(포함이 그 포함이 맞는건가, 근데 앞에서는 상속이랑 포함을 구분한거 같은데)  
![image](https://user-images.githubusercontent.com/68311318/121800582-cb585f00-cc6d-11eb-9044-f09dabe34560.png)  
'참조변수.getClass().getName()'은 참조변수가 가리키고 있는 인스턴스의 클래스 이름을 문자열로 반환한다. getClass()에 대한 자세한 내용은 9장에서 배우게 된다.  
```
어떤 타입에 대한 instanceof연산의 결과가 true라는 것은 검사한 타입으로 형변환이 가능하다는 것을 의미한다.!!
```

## 5.4 참조변수와 인스턴스의 `연결`
조상 타입의 참조변수와 자손타입의 참조변수의 차이점이 `사용할 수 있는 멤버의 개수`에 있다고 배웠다. 여기서 한가지 더 알아두어야 할 내용이 있다.  
조상 클래스에 선언된 멤버변수와 같은 이름의 `인스턴스` 변수를 자손 클래스에 중복으로 정의했을때, 조상타입의 참조변수로 자손 인스턴스를 참조하는 경우와 자손타입의 참조변수로 자손 인스턴스를 참조하는 경우는 서로 다른 결과를 얻는다.  
메서드의 경우 조상 클래스의 메서드를 자손의 클래스에서 오버라이딩한 경우에도 참조변수의 타입에 관계없이 항상 `인스턴스의 메서드(오버라이딩된 메서드)가 호출`되지만, 멤버변수의 경우 참조변수의 타입에 따라 달라진다.  
참고 : static메서드는 static변수처럼 참조변수의 타입에 영향을 받는다. 참조변수의 타입에 영향을 받지 않는 것은 인스턴스 메서드 뿐이다. `그래서 static 메서드는 반드시 참조변수가 아닌 '클래스이름.메서드()'로 호출해야한다.`  

결론부터 말하자면, 멤버변수가 조상 클래스와 자손 클래스에 `중복`으로 정의된 경우, 조상타입의 참조변수를 사용했을때는 조상 클래스에 선언된 멤버변수가 사용되고, 자손타입의 참조변수를 사용했을때는 자손클래스에 선언된 멤버변수가 사용된다.  
하지만 중복 정의되지 않은 경우, 조상타입의 참조변수를 사용했을때와 자손타입의 참조변수를 사용했을 때의 차이는 없다. 중복된 경우는 참조변수의 타입에 따라 달라지지만, 중복되지 않은 경우 하나뿐이므로 선택의 여지가 없기 때문이다.  

```java
class Test {
  public static void main(String[] args) {
    Parent p = new Child();
    Child c = new Child();

    System.out.println("p.x = " + p.x);
    p.method();

    System.out.println("c.x = " + c.x);
    c.method();
  }
}

class Parent {
  int x = 100;

  void method() {
    System.out.println("Parent Method");
  }
}

class Child extends Parent {
  int x = 200;

  @Override
  void method() {
    System.out.println("Child Method");
  }
}
```
타입은 다르지만, 참조변수 p와 c모두 Child인스턴스를 참조하고 있다. 그리고 Parent클래스와 Child클래스는 서로 같은 멤버들을 정의하고 있다.  
이 때 조상타입의 참조변수 p로 Child인스턴스의 멤버들을 사용하는 것과 자손타입의 참조변수 c로 Child인스턴스의 멤버들을 사용하는 것의 차이를 알 수 있다.  
메서드인 method()의 경우 참조변수의 타입에 관계없이 항상 실제 인스턴스의 타입인 Child클래에 정의된 메서드가 호출되지만, 인스턴스 변수인 x는 참조변수의 타입에 따라서 달라진다.  
(그러니까 원래 조상타입 레퍼런스로 자손타입 인스턴스의 멤버는 아예사용하지 못한다. 단 자손타입 인스턴스에 오버라이딩한 메서드는 사용 가능하다!!!)  
```java
class Test {
  public static void main(String[] args) {
    Parent p = new Child();
    Child c = new Child();

    System.out.println("p.x = " + p.x);
    p.method();

    System.out.println("c.x = " + c.x);
    c.method();
  }
}

class Parent {
  int x = 100;

  void method() {
    System.out.println("Parent Method");
  }
}

class Child extends Parent { }
```
이전의 예제와는 달리 Child클래스에는 아무런 멤버도 정의되어있지 않고 단순히 조상으로부터 멤버들을 상속받는다. 그렇기 때문에 참조변수의 타입에 관계없이 조상의 멤버들을 사용하게 된다.  
이처럼 자손클래스에서 조상클래스의 멤버를 중복으로 정의하지 않았을 때는 참조변수의 타입에 따른 변화는 없다. 어느 클래스의 멤버가 호출되어야 할지, 즉 조상의 멤버가 호출되어야할지, 자손의 멤버가 호출되어야할지에 대해 선택의 여지가 없기 때문이다.  
참조변수의 타입에 따라 결과가 달라지는 경우는 조상클래스의 멤버변수와 같은 이름의 멤버변수를 자손 클래스에 중복해서 정의한 경우 뿐이다.  
```java
class Test {
  public static void main(String[] args) {
    Parent p = new Child();
    Child c = new Child();

    System.out.println("p.x = " + p.x);
    p.method();
    System.out.println();
    System.out.println("c.x = " + c.x);
    c.method();
  }
}

class Parent {
  int x = 100;

  void method() {
    System.out.println("Parent Method");
  }
}

class Child extends Parent {
  int x =200;

  @Override
  void method() {
    System.out.println("x= " + x); // this.x와 같다
    System.out.println("super.x =" + super.x);
    System.out.println("this.x =" + this.x);
  }
}
```
자손 클래스 Child에 선언된 인스턴스 변수 x와 조상 클래스 Parent로부터 상속받은 인스턴스변수 x를 `구분`하는데 참조변수 super와 this가 사용된다. 자손인 Child클래스에서의 super.x는 조상클래스인 Parent에 선언된 인스턴스변수 x를 뜻하며, this.x또는 x는 Child클래스의 인스턴스 변수 x를 뜻한다. 그래서 위 결과에서 x와 this.x의 값이 같다.  

전에 배운 것과 같이 멤버변수들은 주로 private으로 접근을 제한하고, 외부에서는 메서드를 통해서만 멤버변수에 접근할 수 있도록 하지, 이번 예제에서처럼 `다른 외부 클래스에서 참조변수를 통해 직접적으로 인스턴스변수에 접근할 수 있게 하지 않는다`. 예제에서 알수 잇듯이 `인스턴스변수에 직접 접근하면`, **참조변수의 타입에 따라 사용되는 인스턴스변수가 달라질수있으므로 주의**해야한다.  

## 5.5 매개변수의 다형성
참조변수의 다형적인 특징은 메서드의 매개변수에도 적용된다. 
```java
class Product {
  int price; // 제품의 가격
  int bonusPoint; // 제품구매시 제공하는 보너스 점수
}
class Tv extends Product { }
class Computer extends Product { }
class Audio extends Product { }

class Buyer {
  int money = 1000; // 소유금액
  int bonusPoint = 0; // 보너스 점수
}
```
Product 클래스는 Tv, Audio, Computer클래스의 조상이며, Buyer클래스는 제품(Product)을 구입하는 사람을 클래스로 표현한 것이다.  
Buyer클래스에 물건을 구입하는 기능의 메서드를 추가해보자. 구입할 대상이 필요하므로 매개변수로 구입할 제품을 넘겨받아야한다. 
```java
void buy(Tv t) {
  money = monoey - t.price;

  bonusPoint = bonusPoint + t.bonusPoint;
}
```
Tv밖에 못산다
```java
void buy(Computer c) {
  money = monoey - c.price;
  bonusPoint = bonusPoint + c.bonusPoint;
}

void buy(Audio a) {
  money = money - a.price;
  bonusPoint = bonusPoint + a.bonusPoint;
}
```
이렇게 되면, 제품의 종류가 늘어날때마다 Buyer클래스에는 새로운 buy메서드를 추가해주어야한다.  
그러나 메서드의 매개변수에 다형성을 적용하면 아래와 같이 하나의 메서드로 간단히 처리한다.  
```java
void buy(Product p) {
  money = money - p.price;
  bonusPoint = bonusPoint + p.bonusPoint;
}
```
앞으로 다른 제품 클래스를 추가할때 Product 클래스를 상속받기만 하면, buy(Product p)메서드의 매개변수로 받아들여질수있다.  
```java
Buyer b = new Buyer();
Tv t = new Tv();
Computer c = new Computer();
b.buy(t);
b.buy(c);
```
참고 : Tv t = new Tv(); b.buy(t);를 한문장으로 줄이면 b.buy(new Tv());가 된다.  

```java
class Test {
  public static void main(String[] args) {
    Buyer b = new Buyer();

    b.buy(new Tv());
    b.buy(new Computer());

    System.out.println("현재 남은 돈은 " + b.money + "만원입니다");
    System.out.println("현재 보너스 점수는 " + b.bonusPoint + "점입니다");
  }
}

class Product {
  int price;
  int bonusPoint;

  Product(int price) {
    this.price = price;
    bonusPoint = (int) (price / 10.0);
  }
}

class Tv extends Product {
  Tv() {
    super(100);
  }

  @Override
  public String toString() {
    return "Tv";
  }
}

class Computer extends Product {
  Computer() {
    super(200);
  }

  @Override
  public String toString() {
    return "Computer";
  }
}

class Buyer {
  int money = 1000; // 소유금액
  int bonusPoint = 0;

  void buy(Product p) {
    if(money < p.price) {
      System.out.println("잔액이 부족하여 물건을 살 수 없습니다");
      return;
    }

    money -= p.price;
    bonusPoint += p.bonusPoint;
    System.out.println(p + "을/를 구입하였습니다");
  }
}
```
매개변수의 다형성은 또다른 예로 PrintStream클래스에 정의되어있는 print(Object o)메서드를 살펴보자. print(Object o)는 매개변수로 Object타입의 변수가 선언되어 있는데 Object클래스는 모든 클래스의 조상이므로 이 메서드의 매개변수로 어떤타입의 인스턴스도 가능하므로, 이 하나의 메서드로 모든 타입의 인스턴스를 처리할 수 있는 것이다.  
이 메서드는 매개변수에 toString()을 호출하여 문자열을 얻어서 출력한다. 실제 코드는 아래와 같다.  
```java
public void print(Object obj) {
  write(String.valueOf(obj)); // valueOf()가 반환한 문자열을 출력한다.
}

public static String valueOf(Object obj) {
  reteurn (obj == null) ? "null" : obj.toString(); // 문자열을 반환한다.
}
```

## 5.6 여러종류의 객체를 배열로 다루기
조상타입의 참조변수로 자손타입의 객체를 참조하는 것이 가능하므로, Product클래스가 Tv, Computer, Audio 클래스의 조상일때, 다음과 같이 할 수 있는 것을 이미 배웠다.  
```java
Product p1 = new Tv();
Product p2 = new Computer();
Product p3 = new Audio();
```
위의 코드를 Product타입의 참조변수 배열로 처리하면 다음과 같다!!
```java
Product p[] = new Product[3];
p[0] = new Tv();
p[1] = new Computer();
p[2] = new Audio();
```
이처럼 조상타입의 참조변수 배열을 사용하면, 공통의 조상을 가진 서로 다른 종류의 객체를 배열로 묶어서 다룰 수 있다. 또는 묶어서 다루고 싶은 객체들의 상속관계를 따져서 가장 가까운 공통조상 클래스 타입의 참조변수 배열을 생성해서 객체들을 저장하면 된다.  
이러한 특징을 이용해서 Buyer클래스에 구입한 제품을 저장하기 위한 Product배열을 추가해보자.  
```java
class Buyer {
  int money = 1000;
  int bonusPoint = 0;
  Product[] item = new Product[10];
  int i = 0;

  void buy(Product p) {
    if(money < p.price) {
      System.out.println("잔액이 부족하여 물건을 살 수 없습니다");
      return;
    }

    money -= p.price;
    bonusPoint += p.bonusPoint;
    item[i++] = p;
    System.out.println(p + "을/를 구입하셨습니다");
  }
}
```
```java
class Test {
  public static void main(String[] args) {
    Buyer b = new Buyer();

    b.buy(new Tv());
    b.buy(new Computer());
    b.buy(new Audio());
    b.summary();

  }
}

class Product {
  int price;
  int bonusPoint;

  Product(int price) {
    this.price = price;
    bonusPoint = (int) (price / 10.0);
  }
}

class Tv extends Product {
  Tv() {
    super(100);
  }

  @Override
  public String toString() {
    return "Tv";
  }
}

class Computer extends Product {
  Computer() {
    super(200);
  }

  @Override
  public String toString() {
    return "Computer";
  }
}

class Audio extends Product {
  Audio() {
    super(50);
  }

  @Override
  public String toString() {
    return "Audio";
  }
}

class Buyer {
  int money = 1000;
  int bonusPoint = 0;
  Product[] item = new Product[10];
  int i = 0;

  void buy(Product p) {
    if(money < p.price) {
      System.out.println("잔액이 부족하여 물건을 살 수 없습니다");
      return;
    }

    money -= p.price;
    bonusPoint += p.bonusPoint;
    item[i++] = p;
    System.out.println(p + "을/를 구입하셨습니다");
  }

  void summary() {
    int sum = 0;
    String itemList = "";

    for(int i = 0; i < item.length; i++) {
      if(item[i] == null) break;
      sum += item[i].price;
      itemList += item[i] + ", ";
    }

    System.out.println(sum);
    System.out.println(itemList);
  }
}
```
참고 : 구입한 제품목록의 마지막에 출력되는 콤마(,)가 눈에 거슬린다면, itemList += item[i] + ",";를 itemList += (i==0) ? "" + item[i] : ", " + item[i];과 같이 변경하자  

위의 예제에서 Product배열로 구입한 제품들을 저장할 수 있도록 했지만, 배열의 크기를 10으로 했기 때문에 11개 이상의 제품을 구입할 수 없는 것이 문제다. 그렇다고 해서 배열의 크기를 무조건 크게 설정할 수 만도 없는 일이다.  

이런 경우, Vector 클래스를 사용하면된다. Vector클래스는 내부적응로 Object타입의 배열을 가지고 있어서, 이 배열에 객체를 추가하거나 제거할 수 있게 작성되었다.  
그리고 배열의 크기를 알아서 관리해주기 때문에 저장할 인스턴스의 개수에 신경 쓰지 않아도 된다.  
```java
public class Vector extends AbstractList
  implements List, Cloneable, java.io.Serializable {
    protected Object elementData[];
    ...
  }
```
Vector클래스는 이름 때문에 클래스의 기능을 오해할 수 있는데, 단지 동적으로 크기가 관리되는 객체배열일 뿐이다.  
```
메서드/생성자               설명

Vector()                   10개의 객체를 저장할 수 있는 Vector인스턴스를 생성한다. 
                           10개 이상의 인스턴스가 저장되면, 자동적으로 크기가 증가한다.
boolean add(Object o)      Vector에 객체를 추가한다. 추가에 성공하면 결과값으로 true, 실패하면 false를 반환한다. 
boolean remove(Object o)   Vector에 저장되어잇는 객체를 제거한다. 제거에 성공하면 true, 실패하면 false를 반환한다.
boolean isEmpty()          Vector가 비어잇는지 검사한다. 비어잇으면 true, 비어있지 않으면 false를 반환한다.
Object get(int index)      지정된 위치(index)의 객체를 반환한다. 반환타입이 Object타입이므로 적절한 타입으로 형변환이 필요하다.
int size()                 Vector에 저장된 객체의 개수를 반환한다. 
```
```java
import java.util.Vector;

class Test {
  public static void main(String[] args) {
    Buyer b = new Buyer();

    Tv tv = new Tv();
    Computer com = new Computer();
    Audio audio = new Audio();

    b.buy(tv);
    b.buy(com);
    b.buy(audio);
    b.summary();

    System.out.println();

    b.refund(com);
    b.summary();
  }
}

class Product {
  int price;
  int bonusPoint;

  Product(int price) {
    this.price = price;
    bonusPoint = (int) (price / 10.0);
  }

  Product() {
    price = 0;
    bonusPoint = 0;
  }
}

class Tv extends Product {
  Tv() {
    super(100);
  }

  @Override
  public String toString() {
    return "Tv";
  }
}

class Computer extends Product {
  Computer() {
    super(200);
  }

  @Override
  public String toString() {
    return "Computer";
  }
}

class Audio extends Product {
  Audio() {
    super(50);
  }

  @Override
  public String toString() {
    return "Audio";
  }
}

class Buyer {
  int money = 1000;
  int bonusPoint = 0;
  Vector item = new Vector();

  void buy(Product p) {
    if(money < p.price) {
      System.out.println("잔액이 부족하여 물건을 살 수 없습니다");
      return;
    }

    money -= p.price;
    bonusPoint += p.bonusPoint;
    item.add(p);
    System.out.println(p + "을/를 구입하셨습니다");
  }

  void refund(Product p) {
    if(item.remove(p)) {
      money += p.price;
      bonusPoint -= p.bonusPoint;
      System.out.println(p + "를 반품햇다");
    } else {
      // 제거에 실패한 경우
      System.out.println("구입하신제품중 해당제품이 없습니다");
    }
  }

  void summary() {
    int sum = 0;
    String itemList = "";

    if(item.isEmpty()) {
      System.out.println("구입하신 제품이 없습니다");
      return;
    }

    for(int i = 0; i < item.size(); i++) {
      Product p = (Product)item.get(i);
      sum += p.price;
      itemList += (i==0) ? "" + p : ", " + p;
    }

    System.out.println("구입하신 물품의 총금액은" + sum + "만원입니다");
    System.out.println("구입하신 제품은 " + itemList + "이다");
  }
}
```
참고 : 문자열과 참조변수의 덧셈(결합연산)은 참조변수에 toString()을 호출해서 문자열을 얻어 결합한다.