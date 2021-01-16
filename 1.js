function fn() {
    var foo = 1;
    if (true) {
        foo = 2;

        function foo() {}
        foo = 3;
        console.log(foo);
    }
    console.log(foo);
}
fn();