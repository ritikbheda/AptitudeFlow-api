function arraysEqual(a: any[], b: any[]) {
  return a.sort().toString() === b.sort().toString();
}

export function countSimilarAnswers(
  arr1: any[] | undefined,
  arr2: any[]
): number {
  var counter = 0;

  arr1?.forEach((option1) => {
    const match = arr2.some((option2) => {
      if (option1._id.toString() === option2._id.toString()) {
        if (Array.isArray(option1.answer) && Array.isArray(option2.answer)) {
          return arraysEqual(option1.answer, option2.answer);
        } else {
          return option1.answer === option2.answer;
        }
      }
    });

    if (match) counter++;
  });

  return counter;
}
