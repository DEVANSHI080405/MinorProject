#define BLYNK_TEMPLATE_ID "TMPL3ND04_jNt"
#define BLYNK_TEMPLATE_NAME "NodeMCU"
#define BLYNK_AUTH_TOKEN "9-mhun2kqS5jNY_GkbopL72Mb5NNIVht"
 
#define BLYNK_PRINT Serial
#include <gpio.h>
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
 
char auth[] = BLYNK_AUTH_TOKEN;
 
char ssid[] = "Redmi 10A Sport"; // Your Wifi Name
char pass[] = "devanshi@123"; // Your Wifi Password

BLYNK_WRITE(V1)
{
  int value = param.asInt();
  Serial.println(value);
  if(value == 1)
  {
    digitalWrite(D0, LOW); 
    Serial.println("LED ON"); 
  }
  if(value == 0)
  {
     digitalWrite(D0, HIGH);
     Serial.println("LED OFF");
  }
}
 
BLYNK_WRITE(V2)
{
  int value = param.asInt();
  Serial.println(value);
  if(value == 1)
  {
    digitalWrite(D1, LOW);
    Serial.println("LED ON");
  }
  if(value == 0)
  {
     digitalWrite(D1, HIGH);  
     Serial.println("LED OFF");
  }
}
 
BLYNK_WRITE(V3)
{
  int value = param.asInt();
  Serial.println(value);
  if(value == 1)
  {
    digitalWrite(D2, LOW);
    Serial.println("LED ON");
  }
  if(value == 0)
  {
     digitalWrite(D2, HIGH);
     Serial.println("LED OFF");
  }
}
 
BLYNK_WRITE(V4)
{
  int value = param.asInt();
  Serial.println(value);
  if(value == 1)
  {
    digitalWrite(D3, LOW);
    Serial.println("LED ON");
  }
  if(value == 0)
  {
     digitalWrite(D3, HIGH);
     Serial.println("LED OFF");
  }
}
 
 
void setup()
{
  Serial.begin(115200);
  Blynk.begin(auth, ssid, pass);
  pinMode(V0,OUTPUT); 
  pinMode(V1,OUTPUT); 
  pinMode(V2,OUTPUT);
  pinMode(V3,OUTPUT);
}
 
void loop()
{
  Blynk.run();
}
