/*
1. - You are given an array of positive integers as argument. 
You must generate all the possible divisions between 
each pair of its elements that outputs an integer value.

For example:
  arr = [2, 4, 27, 16, 9, 15, 25, 6, 12, 83, 24, 49, 7, 5, 94, 12, 6]
  You must then create a list, sorted by the quotient value, 
  containing the corresponding numerator and 
  denominator taken from the given array.

Format: 
  (quotient, (numerator, denominator))
  [(2, (4, 2)), (2, (12, 6)), (2, (12, 6)), (2, (12, 6)), (2, (12, 6)), (2, (24, 12)), 
    (2, (24, 12)), (3, (6, 2)), (3, (6, 2)), (3, (12, 4)), (3, (12, 4)), (3, (15, 5)), 
    (3, (27, 9)), (4, (16, 4)), (4, (24, 6)), (4, (24, 6)), (5, (25, 5)), (6, (12, 2)), 
    (6, (12, 2)), (6, (24, 4)), (7, (49, 7)), (8, (16, 2)), (12, (24, 2)), (47, (94, 2))]

2. - Eliminate all the duplicated cases giving it only once.
(2, (12, 6)) occurs four times, for example (we have more cases)

The data is reduced to:
  [(2, (4, 2)), (2, (12, 6)), (2, (24, 12)), (3, (6, 2)), (3, (12, 4)), (3, (15, 5)), 
    (3, (27, 9)), (4, (16, 4)), (4, (24, 6)), (5, (25, 5)), (6, (12, 2)), (6, (24, 4)), 
    (7, (49, 7)), (8, (16, 2)), (12, (24, 2)), (47, (94, 2))]

3. - Select the quotients that are higher or equal than a certain given value.
If the given value is 6 will reduce even more our cases:
  [(6, (12, 2)), (6, (24, 4)), (7, (49, 7)), (8, (16, 2)), (12, (24, 2)), (47, (94, 2))]

4. - Select the results by even or odd quotient value.
Supose that we are interested in odd values only, we will finally have:
  [(7, (49, 7)), (47, (94, 2))]

So our function sel_quot() may receive the following arguments 
in the following order outputting the corresponding result:
  # same array as above, arr
  dir_str = 'odd'
  sel_quot(arr, 6, dir_str) == [(7, (49, 7)), (47, (94, 2))] # 

Our function should be able to receive only an array and the integer value. 
(Without doing the even/odd selection)

# same array, arr
sel_quot(arr, 6) == [(6, (12, 2)), (6, (24, 4)), 
  (7, (49, 7)), (8, (16, 2)), (12, (24, 2)), (47, (94, 2))]

Assumptions: 
  All integer values in the array, including m, will be >= 2.
  The strings will be exactly given as 'even' and 'odd' or 'Even' and 'Odd'.
*/


// Solution

function selectQuotients(arr, m, dirStr) {
  let rem = dirStr && dirStr.toLowerCase() === 'odd' ? 1 : 0;
  let seen = new Set();
  let res = [];
  let sort = arr.sort((a, b) => b - a);
  
  for (let i = 0; i < sort.length - 1; i++) {
    for (let j = i + 1; j < sort.length; j++) {
      let div = sort[i] / sort[j];

      if (div >= m && div % 1 === 0 && (!dirStr || div % 2 === rem)) {
        let key = sort[i] + '_' + sort[j];
        
        if (!seen.has(key)) {
          res.push([div, [ sort[i], sort[j] ] ]);
          seen.add(key);
        }
      }
    }
  }
  res = res.sort((a, b) => a[0] - b[0] || a[1][0] - b[1][0]);;
  
  return res;
}

// or