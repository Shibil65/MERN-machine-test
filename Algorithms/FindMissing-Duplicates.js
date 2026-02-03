function findMIssing(num) {
    const missingnum = [];

    for (let i = 0; i < num.length; i++) {
        const index = Math.abs(num[i]) - 1;
        if (index < num.length && num[index] > 0) {
            num[index] = -num[index];
        }
    }

    for (let i = 0; i < num.length; i++) {
        if (num[i] > 0) {
            missingnum.push(i + 1);
        }
    }
    return missingnum;
    }


function findDuplicate(num) {
    const duplicate = [];

    for (let i = 0;i < num.length;i++){
        const index = Math.abs(num[i]) - 1;
        if(num[index] < 0){
            duplicate.push(Math.abs(num[i]));
        } else{
            num[index] = -num[index]
        }
    }
    return duplicate;
}    

let num = [1,3,3,5,5,7,8,9,9];
console.log(findMIssing([...num]));
console.log(findDuplicate([...num]));
