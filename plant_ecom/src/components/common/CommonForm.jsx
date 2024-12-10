import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";
    
        switch (getControlItem.componentType) { // Ensure you're using the correct `componentType` field
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            });
                        }}
                    />
                );
                break;
    
            case "select":
                element = (
                    <Select
                        onValueChange={(value) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value
                            });
                        }}
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0 ? (
                                getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                            ) : null}
                        </SelectContent>
                    </Select>
                );
                break;
    
            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        id={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            });
                        }}
                    />
                );
                break;
    
            default:
                console.error(`Unsupported componentType: ${getControlItem.componentType}`);
                break;
        }
    
        return element; // Ensure the element is returned
    }
    
    return (
        <form onSubmit={onSubmit} >
          <div className="flex flex-col gap-3">
            {formControls.map(controlItem => (
              <div key={controlItem.name} className="grid w-full gap-1.5">
                <Label className="mb-1">{controlItem.label}</Label>
                {renderInputsByComponentType(controlItem)}
              </div>
            ))}
          </div>
          <Button type="submit" disabled={isBtnDisabled} className="mt-2 w-full">
            {buttonText || "Submit"}
          </Button>
        </form>
    );
}

export default CommonForm