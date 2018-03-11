from Arduino import Arduino
import time

"""
File: servo.py
Author: Antony Nguyen
Description: A function that controls a servo
"""

def servo(servoPin, angle):
    # Connect to the Arduino
    Arduino = Arduino('9600')

    # Connect the Servo object to a pin
    Arduino.Servos.attach(servoPin)

    # Main execution loop
    try:
        Arduino.Servos.write(servoPin, angle)
    except:
        print("\nUnable to rotate to that angle")
