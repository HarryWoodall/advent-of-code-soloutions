using System;
using System.Collections.Generic;
using System.Linq;

namespace _2020
{
    class Program
    {
        static void Main(string[] args)
        {
            // List<int> input = System.IO.File.ReadAllText(@"Files/day10.txt").Split("\r\n").Select(Int32.Parse).ToList();
            // long result = 0;
            // for (int i = 1; i < input.Count; i++) {
            //     int output = getDiff(input, i);
            //     if (result == 0) {
            //         result = Factorial(output);
            //     } else {
            //         result *= Factorial(output);
            //     }
            //     i += output;
            //     System.Console.WriteLine(i);

            // }
            // System.Console.WriteLine(result);

            Day13Part2();
        }

        static int getDiff(List<int> input, int index) {
            int items = 0;
            int range = 0;
            for (int i = index; i < index + 3; i++) {
                if (i < input.Count) {
                    range += input[i] - input[i - 1];
                    if (range <= 3) {
                        items++;
                    } else {
                        break;
                    }
                } 
            }
            return items;
        }

        static int Factorial(int number) {
            switch (number) {
                case 1:
                return 1;
                case 2:
                return 2;
                case 3: 
                return 6;
            }
            return -1;
        }

        static void Day13Part2() {
            // Setup
            Dictionary<int, int> values = new Dictionary<int, int>();
            List<string> input = System.IO.File.ReadAllText(@"Files/day13.txt").Split("\r\n")[1].Split(",").ToList();
            for (int i = 0; i < input.Count; i++) {
                int number = -1;
                int.TryParse(input[i], out number);
                if (number != 0) {
                    values.Add(i, number);
                }
            }

            foreach(var value in values) {
                System.Console.WriteLine(value.Key + " " + value.Value);
            }

            long currentTime = 0;
            bool isFound = false;

            while (!isFound) {
                isFound = true;
                foreach(var item in values) {
                    if ((currentTime + item.Key - 44) % item.Value != 0) {
                        isFound = false;
                        continue;
                    }
                }
                System.Console.WriteLine(currentTime);
                currentTime += values[44];
            }

            System.Console.WriteLine(currentTime);
        }
    }
}
