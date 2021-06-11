# 3 package와 import
## 3.1 패키지(package)
지금까지는 단순히 클래스 이름으로만 클래스를 구분했지만, 사실 클래스의 실제 이름full name은 패키지명을 포함한 것이다.  
String의 실제 이름은 java.lang.String이다.  
클래스가 물리적으로 하나의 클래스파일(.class)인 것과 같이 패키지는 물리적으로 하나의 `디렉토리`이다.  
그래서 어떤 패키지에 속한 클래스는 해당 디렉토리에 존재하는 클래스 파일(.class)이어야 한다.  
java.lang.String 클래스는 물리적으로 디렉토리 java의 서브 디렉토리인 lang에 속한 String.class 파일이다.  
String 클래스는 rt.jar파일에 압축되어 있으며, 이 파일의 압축을 풀면 아래의 그림과 같다.  
![image](https://user-images.githubusercontent.com/68311318/121663839-ccf51c00-cae1-11eb-9c9e-8fce62c0f59f.png)  
참고 : 클래스 파일들을 압축한 것이 jar파일(*.jar)이며 jar파일은 jar.exe외에도 알집이나 winzip으로 압축을 풀 수 있다.  
```
- 하나의 소스파일에는 첫 번째 문장으로 단 한 번의 패키지 선언만을 허용한다
- 모든 클래스는 반드시 하나의 패키지에 속해야한다
- 패키지는 점(.)을 구분자로 하여 계층구조로 구성할 수 있다
- 패키지는 물리적으로 클래스 파일(.class)을 포함하는 하나의 디렉토리이다.
```

## 3.2 패키지의 선언
```
package 패키지명;
```
모든 클래스는 반드시 하나의 패키지에 속해야한다고 했다. 자바에서 기본적으로 제공하는 이름없는 패키지(unnamed package)가 있다.  
```java
package com.codechobo.book;

class PackageTest {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}
```
위의 예제를 작성한다음 -d 옵션을 추가하여 컴파일을 한다.  
```
C:\jdk1.8\work>javac -d . PackageTest.java
```
-d 옵션은 소스파일에 지정된 경로를 통해 패키지의 위치를 찾아서 클래스 파일을 생성한다. 만일 지정된 패키지와 일치하는 디렉토리가 존재하지 않는다면 자동적으로 생성한다. -d 옵션 뒤에는 해당 패키지의 루트(root) 디렉토리의 경로를 적어준다. 여기서는 현재 디렉토리(.) 즉, C:\jdk1.8\work로 지정했기 때문에 컴파일을 수행하고 나면 다음과 같은 구조로 디렉토리가 생성된다.  
![image](https://user-images.githubusercontent.com/68311318/121664931-f793a480-cae2-11eb-98c4-53ea2f8faca4.png)  
이제는 패키지의 루트 디렉토리를 클래스패스(classpath)에 포함시켜야 한다. com.codechobo.book 패키지의 루트 디렉토리는 디렉토리 com 의 상위 디렉토리인 C:\jdk1.8\work 이다. 이 디렉토리를 클래스패스에 포함시켜야만 실행시 JVM이 PackageTest클래스를 찾을 수 있다.  
참고 : 클래스패스는 컴파일러(javac.exe)나 JVM 등이 클래스의 위치를 찾는데 사용되는 경로이다  
![image](https://user-images.githubusercontent.com/68311318/121665822-93251500-cae3-11eb-9c64-e8db812874f4.png)  
';'를 구분자로 하여 여러 개의 경로를 클래스패스에 지정할 수 있으며, 맨 앞에 '.;'를 추가한 이유는 현재 디렉토리(.)를 클래스패스에 포함시기기 위함이다.  
클래스패스를 지정해주지 않으면 기본적으로 현재 디렉토리(.)가 클래스패스로 지정되지만, 이처럼 클래스패스를 따로 지정해주는 경우에는 더 이상 현재 디렉토리가 자동적으로 클래스패스로 지정되지 않기 때문에 이처럼 별도로 추가를 해주어야 한다.  
jar 파일을 클래스패스에 추가하기 위해서는 경로와 파일명을 적어주어야 한다. 예를 들어 C:\jdk1.8\work\util.jar 파일을 클래스패스에 포함시키려면 다음과 같이한다.  
C:\WINDOWS>SET CLASSPATH = .;C:\jdk1.8\work;C:\jdk1.8\work\util.jar;  
이제 클래스패스가 바르게 설정되었는지 확인하기 위해 다음과 같은 명령어를 입력해보자
```
C:\WINDOWS\echo %classpath%
.;C:\jdk1.8\work;
```
현재 디렉토리를 의미하는 '.'와 C:\jdk1.8\work가 클래스패스로 잘 지정되었음을 알 수 있다. 이제 PackageTest 예제를 실행시켜보자  
```
C:\WINDOWS>java com.codechobo.book.PackageTest
Hello World!
```
실행 시에는 이와같이 PackageTest클래스의 패키지명을 모두 적어주어야한다.  
JDK에 기본적으로 설정되어 있는 클래스 패스를 이용하면 위의 예제에서와 같이 클래스패스를 따로 설정하지 않아도 된다. 새로 추가하고자 하는 클래스를 JDK설치디렉토리\jre\classes 디렉토리에, jar파일인 경우에는 JDK설치디렉토리\jre\lib\ext 디렉토리에 넣기만 하면된다.  
참고 : jre 디렉토리 아래의 classes 디렉토리는 JDK설치 시에 자동으로 생성되지 않으므로 사용자가 직접 생성해야한다.  
또는 실행 시에 -cp 옵션을 이용해서 일시적으로 클래스패스를 지정해줄수도 잇다.  
C:\WINDOWS>java -cp c:\jdk1.8\work com.codechobo.book.PackageTest  

## 3.3 import문
소스코드를 작성할때 다른 패키지의 클래스를 사용하려면 패키지명이 포함된 클래스 이름을 사용해야 한다. 하지만 매번 패키지명을 붙이는건 불편하다.  
import문으로 클래스의 패키지를 미리 명시해주면 패키지명은 생략할 수 있다.  
import문의 역할은 컴파일러에게 소스파일에 사용된 클래스의 패키지에 대한 정보를 제공하는 것이다. 컴파일 시에 컴파일러는 import문을 통해 소스파일에 사용된 클래스들의 패키지를 알아낸 다음, 모든 클래스 이름앞에 패키지명을 붙여준다.  
참고 : import 문은 프로그램의 성능에 전혀 영향을 미치지 않는다. import문을 많이 사용하면 컴파일 시간이 아주 조금더 걸릴뿐이다.  

## 3.4 import문의 선언
모든 소스파일(.java)에서 import문은 package문 다음에, 그리고 클래스 선언문 이전에 위치해야한다.  
```
import 패키지명.클래스명;
또는
import 패키지명.*;
```
*로하면 컴파일러가 해당 패키지에서 일치하는 클래스 이름을 찾는데, 실행 시 성능 상의 차이는 전혀 없다.  
import문에서 클래스의 이름대신 *을 사용하는 것이 하위 패키지의 클래스까지 포함하는 것은 아니다.  
```
import java.util.*;
import java.text.*;
```
그래서 위의 두문장 대신 다음과 같이 할수는 없다.
```
import java.*;
```
```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class Test {
  public static void main(String[] args) {
    Date today = new Date();

    SimpleDateFormat date = new SimpleDateFormat("yyyy/MM/dd");
    SimpleDateFormat time = new SimpleDateFormat("hh:mm:ss a");

    System.out.println(date.format(today));
    System.out.println(time.format(today));

  }
}
```
현재 날짜와 시간을 지정된 형식에 맞춰 출력하는 예제이다.
```java
public class Test {
  public static void main(String[] args) {
    java.util.Date today = new java.util.Date();

    java.text.SimpleDateFormat date = new java.text.SimpleDateFormat("yyyy/MM/dd");
    java.text.SimpleDateFormat time = new java.text.SimpleDateFormat("hh:mm:ss a");

    System.out.println(date.format(today));
    System.out.println(time.format(today));

  }
}
```
import문을 안쓰면 위와같이 써야한다. 단 같은 패키지 내의 클래스들은 import문을 지정하지 않고도 패키지명을 생략할 수 있다.  
지금까지 System과 String 같은 java.lang패키지의 클래스들을 패키지명 없이 사용할수 있었던 이유는 모든 소스파일에는 묵시적으로 다음과 같은 import문이 선언되잇기 때문이다.  
```
import java.lang.*;
```

## 3.5 static import문
import문을 사용하면 클래스의 패키지명을 생략할수 있는것과 같이, static import문을 사용하면 static`멤버!!`를 호출할때 클래스명을 생략할수있다.
```java
import static java.lang.Math.PI;
import static java.lang.Math.random;
import static java.lang.System.out;

public class Test {
  public static void main(String[] args) {
    out.println(random());

    out.println(PI);
  }
}
```

