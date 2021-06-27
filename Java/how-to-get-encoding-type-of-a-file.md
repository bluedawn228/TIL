# juniversalchardet
어떤 sql파일의 인코딩 타입을 확인하고 싶어서 다음 jar를 다운받았다.  
https://code.google.com/archive/p/juniversalchardet/  
그런데 encoding타입을 얻을 수 없었다. 'Encodings that can be detected' 목록에 없는 인코딩 타입으로 보인다.  
```java
import org.mozilla.universalchardet.UniversalDetector;

public class TestDetector {
  public static void main(String[] args) throws java.io.IOException {
    byte[] buf = new byte[4096];
    String fileName = args[0];
    java.io.FileInputStream fis = new java.io.FileInputStream(fileName);

    // (1)
    UniversalDetector detector = new UniversalDetector(null);

    // (2)
    int nread;
    while ((nread = fis.read(buf)) > 0 && !detector.isDone()) {
      detector.handleData(buf, 0, nread);
    }
    // (3)
    detector.dataEnd();

    // (4)
    String encoding = detector.getDetectedCharset();
    if (encoding != null) {
      System.out.println("Detected encoding = " + encoding);
    } else {
      System.out.println("No encoding detected.");
    }

    // (5)
    detector.reset();
  }
}
```
에러 : jar를 자바 프로젝트에 추가할때 Modulepath에 추가했더니 `java.lang.NoClassDefFoundError`가 발생했다.  
그래서 Classpath로 옮겼더니 해결됐다.  
https://stackoverflow.com/questions/34413/why-am-i-getting-a-noclassdeffounderror-in-java  
