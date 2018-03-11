from Arduino import Arduino
import time
import sys
from threading import Timer

"""
File: servo.py
Author: Antony Nguyen
Description: A function that controls a servo
"""

def rotate90():
    Arduino.Servos.write(sys.argv[1], 90)

# Connect to the Arduino
Arduino = Arduino('9600')

# Connect the Servo object to a pin
Arduino.Servos.attach(sys.argv[1])

Arduino.pinMode(8, 'OUTPUT')
Arduino.pinMode(9, 'OUTPUT')
Arduino.digitalWrite(8, 'LOW')
Arduino.digitalWrite(9, 'LOW')

# Main execution loop
try:
    Arduino.Servos.write(sys.argv[1], sys.argv[2])
    if(sys.argv[2] == '10') :
        Arduino.digitalWrite(9, 'HIGH')
        time.sleep(1)
        Arduino.digitalWrite(9, 'LOW')
    elif(sys.argv[2] == '180') :
        Arduino.digitalWrite(8, 'HIGH')
        time.sleep(1)
        Arduino.digitalWrite(8, 'LOW')
    rotate90()
    time.sleep(1)
except:
    print("\nUnable to rotate to that angle")
