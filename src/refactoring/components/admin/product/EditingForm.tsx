import { memo } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import DiscountSection from './DiscountSection';
import { useEditingForm } from '../../../hooks/useEditingForm';

const EditingForm = memo(() => {
  const { formFields, handleEditComplete, editingProduct } = useEditingForm();

  if (!editingProduct) return null;

  return (
    <div>
      {formFields.map((field) => (
        <div key={field.id}>
          <Input
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            data-testid={`input-${field.id}`}
          />
        </div>
      ))}
      <DiscountSection discounts={editingProduct.discounts} productId={editingProduct.id} />
      <Button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </Button>
    </div>
  );
});

EditingForm.displayName = 'EditingForm';

export default EditingForm;
