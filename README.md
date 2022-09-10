if You provided a `value` prop to a form field without an `onChange` handler This will render a read-only field. If the field should be mutable use `defaultValue
ie.    <input
          type="text"
          id="discount_description"
          name="discountDescription"
          defaultValue={1}
        />
