# Tic-tac-toe

```
The board consists of 9 cells:

       X→0     1     2
  Y↓  ┌─────┬─────┬─────┐
   0  │ 0,0 │ 1,0 │ 2,0 │
      ├─────┼─────┼─────┤
   1  │ 0,1 │ 1,1 │ 2,1 │
      ├─────┼─────┼─────┤
   2  │ 0,2 │ 1,2 │ 2,2 │
      └─────┴─────┴─────┘

This can be represented in 18 bits:

         ┌─ 2,2 ─╥─ 1,2 ─┬─ 0,2 ─┬─ 2,1 ─┬─ 1,1 ─╥─ 0,1 ─┬─ 2,0 ─┬─ 1,0 ─┬─ 0,0 ─┐
0x0200000│ 0 │ 0 ║ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 ║ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │ 0 │0x00

Each cell can be 1 of 3 states:
1.  empty 0x00 00
2.  O     0x01 01
3.  X     0x03 11

To set the state of a cell, we can use bitwise operations:

function setCell(board, x, y, state) {
    return board &~ (0x03 << bitOffset(x, y)) | state << bitOffset(x, y);
}

The parameters are:
1. board (a number)
2. x coordinate
3. y coordinate
4. state to set 0x00, 0x01 or 0x03

Say for example, we are setting cell 1,0.

The first part of the operation is to clear the bits for the cell:

board &~ (0x03 << 2)

  1   1  << 2
┌─ 1,0 ─┬─ 0,0 ─┐
│ 1 │ 1 │ 0 │ 0 │0x00

We shift the 0x03 bits left 2 bits, so they will affect the two bits for cell 1,0. The ~ operator inverts the bits to 0s and this clears the bit (in case the cell is already set to something).

We end up with:
┌─ 1,0 ─┬─ 0,0 ─┐
│ 0 │ 0 │ 0 │ 0 │0x00

We then set the state on to the same bits:

board | (0x01 << 2)

  0   1  << 2
┌─ 1,0 ─┬─ 0,0 ─┐
│ 0 │ 0 │ 0 │ 0 │0x00

Which results in:
┌─ 1,0 ─┬─ 0,0 ─┐
│ 0 │ 1 │ 0 │ 0 │0x00
```
