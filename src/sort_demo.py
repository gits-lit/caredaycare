from Arduino import Arduino
import time
import sys
from threading import Timer

"""
File: servo.py
Author: Antony Nguyen
Description: A function that controls a servo
"""

def rotate80():
    Arduino.Servos.write(3, 80)

# Connect to the Arduino
Arduino = Arduino('9600')

# Connect the Servo object to a pin
Arduino.Servos.attach(3)

Arduino.pinMode(8, 'OUTPUT')
Arduino.pinMode(9, 'OUTPUT')
Arduino.digitalWrite(8, 'LOW')
Arduino.digitalWrite(9, 'LOW')


# Main execution loop
try:
    count = 0
    while count < 6:
        if count % 2 == 0: 
            Arduino.Servos.write(3, 20 )
            Arduino.digitalWrite(8, 'HIGH')
            time.sleep(1)
            rotate80()
            Arduino.digitalWrite(8, 'LOW')
            count = count + 1
            time.sleep(1)
        else:
            Arduino.Servos.write(3, 110 )
            Arduino.digitalWrite(9, 'HIGH')
            time.sleep(1)
            rotate80()
            Arduino.digitalWrite(9, 'LOW')
            count = count + 1
            time.sleep(1)
except:
    print("\nUnable to rotate to that angle")
