if You provided a `value` prop to a form field without an `onChange` handler This will render a read-only field. If the field should be mutable use `defaultValue
ie.    <input
          type="text"
          id="discount_description"
          name="discountDescription"
          defaultValue={1}
        />


dom elemanına html attribute atmak istersen hep küçük harfli olmalı atribute ismi
 ie     <tr discountid={a.toString(}> olmalı     <tr discountId={a.toString()}> işe yaramaz gelmez attirbute. a undefined ise yine attribute gelmez. discountid="" de olmaz. toString() demezsen a booleanse mesela olmuyo ama a intse oluyo


reacta 
const a = <h1> saa</h1>; ya da 
const a = <MyComponent> saa</MyComponent>;
desen js de a bir obje olur.
a = {prop1:1,prop2 : MyComponent> saa</MyComponent>} olmuyo 
a.prop2 = MyComponent> saa</MyComponent> diyebilrisin. veya 
a = {prop1:1,prop2 : (MyComponent> saa</MyComponent>)} olabilri
