# 2 String 배열
## 2.1 String배열의 선언과 생성
null은 어떠한 객체도 가리키고 있지 않다는 뜻이다.  
참고로 변수타입에 따른 기본값(default value)은 다음과 같다.  
```
boolean   false
char    '\u0000'
byte, short, int    0
long    0L
float   0.0f
double    0.0d 또는 0.0
참조형 변수   null
```

## 2.2 String 배열의 초기화
참조형 변수를 간단히 참조변수라고도 하며, 모든 참조형 변수에는 객체가 메모리에 저장된 주소인 4byte의 정수값(0x0~0xffffffff) 또는 null이 저장된다.  

```java
/*
 */
public class Test {
  public static void main(String[] args) {
    char[] hex = { 'C', 'A', 'F', 'E'};
    String[] binary = {"0000", "0001", "0010", "0011", 
        "0100", "0101", "0110", "0111",
        "1000", "1001", "1010", "1011",
        "1100", "1101", "1110", "1111" };

    String result = "";

    for (int i = 0; i < hex.length; i++) {
      if(hex[i] >= '0' && hex[i] <= '9') {
        result += binary[hex[i]-'0']; // '8' - '0' 의 결과는 8이다.
      } else { // A~F이면
        result += binary[hex[i] - 'A' + 10]; // 'C' - 'A'의 결과는 2
      }
    }
    //String(char[] value)
    System.out.println("hex:" + new String(hex));
    System.out.println("binary:" + result);
  }
}
/*
실행결과 : 
hex:CAFE
binary:1100101011111110
*/
```
16진수를 2진수로 변환하는 예제이다. 먼저 변환하고자 하는 16진수를 배열 hex에 나열한다.  
16진수는 A~F까지 6개의 문자가 포함되므로 char 배열로 처리하였다. 그리고 문자열 배열 binary에는 이진수 '000' 부터 '1111' (16진수로 0~F)까지 모두 16개의 값을 문자열로 저장하였다.  
for문을 이용해서 배열 hex에 저장된 문자를 하나씩 읽어서 그에 해당하는 이진수 표현을 배열 binary에서 얻어 result에 덧붙이고 그 결과를 화면에 출력한다.
```java
result += binary[hex[i] - 'A' + 10];
```
i의 값이 0일 때, hex[0]의 값은 'C'이므로, 위의 문장은 다음과 같은 과정으로 계산된다.  
```
-> result += binary[hex[0] - 'A' + 10]; //hex[0]은 'C'
-> result += binary['C' - 'A' + 10]; // 'C' - 'A' -> 67 -65 -> 2
-> result += binary[2+10];
-> result += binary[12];
-> result += "1100";
```

## 2.3 char 배열과 String 클래스
지금까지 여러 문자, 즉 문자열을 저장할 때 String 타입의 변수를 사용했다. 사실 문자열이라는 용어는 '문자를 연이어 늘어놓은 것'을 의미하므로 문자배열인 char배열과 같은 뜻이다!  
그런데 자바에서는 char배열이 아닌 String 클래스를 이용해서 문자열을 처리하는 이유는 String 클래스가 char배열에 여러가지 기능을 추가하여 확장한 것이기 때문이다.  
그래서 char 배열을 사용하는 것보다 String 클래스를 사용하는 것이 문자열을 다루기 더 편리하다
```
String 클래스는 char 배열에 기능(메서드)을 추가한 것이다.
```
C언어에서는 문자열을 char배열로 다루지만, 객체지향 언어인 자바에서는 char 배열과 그에 관련된 기능들을 함께 묶어서 클래스에 정의한다. 객체지향개념이 나오기 이전의 언어들은 데이터와 기능을 따로 다루엇지만 객체지향 언어에서는 데이터와 그에 관련된 기능을 구분하지 않고 함께 묶는 것이다.  
여기서 말하는 기능은 함수를 의미하며 메서드는 객체지향 언어에서 함수 대신 사용하는 용어일뿐 함수와 같은 듯이다.  
char 배열과 String 클래스의 한가지 중요한 차이가 있는데, String 객체는 읽을수만 있을뿐 내ㅛㅇㅇ을 변경할수없다는 것이다. 
```java
String str = "Java";
str = str + "8";   // "Java8"이라는 새로운 문자열이 str에 저장된다
System.out.println(str);  // "Java8"
```
위의 문장에서 문자열 str의 내용이 변경되는 것 같지만, 문자열은 변경할 수 없으므로 새로운 내용의 문자열이 생성된다. 변경 가능한 문자열을 다루려면 StringBuffer클래스를 사용하면 된다. 문자열에 대한것은 9장에서 설명한다.

**String클래스의 주요메서드**
Stirng클래스는 상당히 많은 문자열 관련 메서들을 제공하지만 지금은 가장 기본적인 몇 가지만 살펴보고 나머지는 9장에서 자세히 다룰 것이다. 자세히 이해하려 하지 말고 원하는 결과를 얻으려면 어떻게 코드를 작성해야하는지 정도만 이해하자.
```
char charAt(int index) : 문자열에서 해당 위치(index)에 있는 문자를 반환한다
int length() : 문자열의 길이를 반환한다
String substring(int from, int to) : 문자열에서 해당범위(from~to)에 있는 문자열을 반환한다.(to는 범위에 포함되지 않음)
boolean equals(Object obj) : 문자열의 내용이 obj와 같은지 확인한다. 같으면 결과는 true, 다르면 false가 된다. equalsIgnoreCase()도 있음
char[] toCharArray() : 문자열을 문자배열(char[])로 변환해서 반환한다.
```

**char배열과 String클래스의 변환**
가끔 char 배열을 String 클래스로 변환하거나, 또는 그 반대로 변환해야하는 경우가 있다. 그럴때 다음의 코드를 사용하자. 
```java
char[] chArr = {'A', 'B', 'C'};
String str = new String(chArr); // char배열 -> String
char[] tmp = str.toCharArray(); // String -> char배열
```
```java
public class Test {
  public static void main(String[] args) {
    String source = "SOSHELP";
    String[] morse = {".-", "-...", "-.-.", "-..", "."
        , "..-.", "--.", "....", "..", ".---"
        , "-.-", ".-..", "--", "-.", "---"
        , ".--.", "--.-", ".-.", "...", "-"
        , "..-", "...-", ".--", "-..-", "-.--"
        , "--.."};
    String result = "";

    for (int i=0; i < source.length(); i++) {
      result += morse[source.charAt(i) - 'A'];
    }

    System.out.println("source:" + source);
    System.out.println("morse:" + result);
  }
}
```

문자열을 모르스 부호로 변환하는 예제이다. 이전의 16진수를 2진수로 변환하는 예제와 같지만, char배열대신 Stirng 배열을 사용했다. 
```
result += morse[source.charAt(i) - 'A'] // i가 0일때
result += morse[source.charAt(0) - 'A']
result += morse['S' - 'A']; // 'S' - 'A' -> 83 - 65 -> 18
result += morse[18]
result += "..."
```

## 2.4 커맨드 라인을 통해 입력받기

Scanner 클래스의 nextLine()외에도 화면을 통해 사용자로부터 값을 입력받을 수 있는 간단한 방법이 잇다. 바로 커맨드라인을 이용한 방법인데, 프로그램을 실행할 때 클래스 이름 뒤에 공백문자로 구분하여 여러 개의 문자열을 프로그램에 전달 할 수 있다.
```
c:\jdk1.8\work\ch5>java MainTest abc 123
```
커맨드라인을 통해 입력된 두 문자열은 String 배열에 담겨서 MainTest클래스의 main메서드의 매개변수(args)에 전달된다. 그리고는 main메서드 내에서 args[0], args[1]과 같은 방식으로 커맨드라인으로부터 전달받은 문자열에 접근할 수 있다. 여기서 args[0]은 "abc"이고 args[1]은 "123"이 된다.  
커맨드라인에 입력된 매개변수는 공백문자로 구분하기 때문에 입력될 값에 공백이 있는 경우 큰타옴표로 감ㅆ주어야한다. 그리고 커맨드라인에서 숫자를 입력해도 숫자가 아닌 문자열로 처리된단 것에 주의해야한다. 문자열 "123"을 숫자 123으로 바꾸려면 다음과 같이 한다. 
```java
int num = Integer.parseInt("123");
```
그리고 커맨드 라인에 매개변수를 입력하지 않으면 크기가 0인 배열ㄹ이 생성되어 args.length값은 0이 된다. 만일 입력된 매개변수가 없다고 해서 배열을 생성하지 않으면 참조변수 args의 값은 null이 될것이고, 배열 args를 사용하는 모든 코드에서 에러가 발생할 것이다. 이러한 에러를 피하려면, 다음과 같이 main메서에 if문을 추가해줘야한다.
```java
public class Test {
  public static void main(String[] args) {
    if(args != null) {
      System.out.println("매개변수의 개수:" + args.length);
      for (int i = 0; i < args.length; i++) {
        System.out.println("args[" + i + "] = \""+args[i] + "\"" );
      }
    }
  }
}
```
그러나 JVM이 입력된 매개변수가 없을때, null 대신 크기가 0인 배열을 생성해서 args에 전달하도록 구현되어 우리는 이러한 수고를 덜게되었다.