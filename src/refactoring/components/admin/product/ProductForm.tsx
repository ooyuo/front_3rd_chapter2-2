import { memo } from 'react';
import { FORM_FIELDS, NewProduct, useProductForm } from '../../../hooks/useProductForm';
import Button from '../../common/Button';
import Input from '../../common/Input';

const ProductForm = memo(() => {
  const { formData, updateField, handleSubmit } = useProductForm();

  const handleInputChange =
    (field: keyof NewProduct) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
      updateField(field, value);
    };

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>

      {FORM_FIELDS.map(({ id, label, type, placeholder }) => (
        <Input
          key={id}
          id={id}
          type={type}
          label={label}
          value={formData[id as keyof NewProduct]}
          onChange={handleInputChange(id as keyof NewProduct)}
          placeholder={placeholder}
          required
        />
      ))}

      <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </Button>
    </form>
  );
});

ProductForm.displayName = 'ProductForm';

export default ProductForm;
