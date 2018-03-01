from Arduino import Arduino
import time

"""
File: servo.py
Author: Antony Nguyen
Description: A program to test servos connected to an
             Arduino using Nanpy. Prompts the user to 
             repeatedly enter angle values that the
             servo will turn to.
"""

servoPin = 2

# Connect to the Arduino
Arduino = Arduino('9600')

# Connect the Servo object to a pin
Arduino.Servos.attach(servoPin)

# Main execution loop
try:
    while True:
        angle = input("Enter a value to rotate to: ")
        print("Setting servo to ", angle)
        Arduino.Servos.write(servoPin, angle)
        time.sleep(1)
except:
    print("\nClosing program...")
