# CARE DAYCARE

![care daycare](https://user-images.githubusercontent.com/32719891/37696501-34cde9a0-2c94-11e8-9ad5-f2c3012381ee.jpg)

<p align="center">
    <b>
      Clark Antony Rick's Emergency Drug Alexa-compatible Yield, Classification, And Reminder Equipment
    </b>
</b>
<br />
A pill dispenser built for IEEE Quarterly Project Winter 2018

## Table of Contents
- [Team Members](https://github.com/gits-lit/qpwinter2018#team-members)
- [Purpose and Idea](https://github.com/gits-lit/qpwinter2018#purpose-and-idea)
- [Parts](https://github.com/gits-lit/qpwinter2018#parts)
- [Demonstration](https://github.com/gits-lit/qpwinter2018#demonstration)
- [Additional Credit](https://github.com/gits-lit/qpwinter2018#additional-credit)
- [License](https://github.com/gits-lit/qpwinter2018#license)

## Team Members
- [Rick Duy Huynh](https://github.com/RickHuynh) - Mechanical Design Lead - Sorting Mechanism / Laser Cut Casing
- [Antony Nguyen](https://github.com/eminguyen) - Circuitry / Python Scripts / Mechanical Design Assistant
- [Clark Phan](https://github.com/ClarkPhan) - Website Development / Alexa Integration / Python Scripts

## Purpose and Idea
Our group created this project for IEEE UCSD Branch's Quarterly Project Showcase.
<br />
The theme for Winter 2018 was to create a health device. 
<br />
<br />
We came up with the idea of creating a pill dispenser because it would be a project
that could combine a lot of our skills. Many people, especially the elderly, who rely on medication also
deal with memory loss. This project helps prevent accidental drug overdose and ensures that pills get
taken at exactly the right time.
<br />
Here are several features that make this pill dispenser unique. 
### Website
First, we decided that we needed to create an interface to make our project usable. This would be
the bridge between hardware and software. It is important, especially given our target consumer base,
that we make the experience as user-friendly as possible. So, we decided to create a website that is
intentionally simplistic. It only consists of two buttons - one to dispense the pill and the other to
tell the device to dispense the pill at a later time.
### Alexa Compatibility
With the popularity in home automation devices in recent years, we knew that we wanted to give our
device a voice assistant. Because of this, we made our device Alexa compatible using Amazon's skill kit.
You can hook up our project to an Amazon Echo or other Alexa compatible device and give commands including
but not limited to "Alexa dispense me my pill" or "Alexa how many pills do I have left"
### Sorting System
We included a sorting system for our pill dispenser. Our project is designed so that you can insert pills
of two different colors into it and it will sort the pills into their designated storage tube. This functionality
is intended to make the user experience even more user-friendly while also allowing our device to dispense multiple
types of pills instead of just one. To add to the user experience, we have also included an LED light that will flash
the color that your pill is when sorted or dispensed. Unfortunately, while our code for the color recognition works and 
our sorting mechanism works, the actual color recognition unit that we bought off Amazon failed to accurately read color
for small projects. We could not get a better unit shipped in time before our project's deadline but if we decide to return
to this project in the future, color sorting can be very simply added by replacing the part.

## Parts

### Electronic Parts
1. Raspberry Pi
2. Arduino
3. Amazon Echo
4. Servos
5. Color Recognition Unit
6. LEDs
7. Wires

### Building Materials
1. Medium Density Fibreboard
2. Cardboard
3. Foam Board
4. Popsicle Sticks
5. PVC Piping
6. Acrylic
7. Wood Glue
8. Super Glue
9. Paperclip
10. Tape

### Tools
1. Laser Cutter
2. Drill
3. Solder Iron

## Demonstration

![ezgif com-optimize](https://user-images.githubusercontent.com/32719891/37697038-bfb606f8-2c97-11e8-9544-88b0cb6ebee5.gif)

- Videos coming in the future!

## Additional Credit / Special Thanks
- [IEEE UCSD for hosting the competition](https://www.facebook.com/ieeeucsd/)
- [UCSD ECE Department for sponsorship](http://www.ece.ucsd.edu/)

## License
Copyright 2018 Rick Huynh Antony Nguyen Clark Phan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
