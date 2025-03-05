import React, { FC, useState } from 'react';
import { Param, Model } from './Main';
import { TypeParamValue } from './Main';

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: FC<Props> = ({ model, params }) => {
  const [editableModel, setEditableModel] = useState<Model>(model);
  const [openModel, setOpenModel] = useState<boolean>(false);

  const getModel = () => {
    return JSON.stringify(editableModel, null, 2);
  };

  const getModelParamValue = (paramId: number): string | number => {
    const modelParam = editableModel.paramValues.find(
      (modelParam) => modelParam.paramId === paramId
    );

    return modelParam ? modelParam.value : '';
  };

  const getInputType = (type: TypeParamValue) => {
    return type === 'number' ? 'number' : 'text';
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.getAttribute('id');
    const value = e.currentTarget.value;
    if (!id) {
      return;
    }

    setEditableModel((prev) => {
      return {
        ...prev,
        paramValues: prev.paramValues.map((param) => {
          if (String(param.paramId) === id) {
            return { ...param, value };
          }
          return param;
        }),
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenModel(true);
  };

  return (
    <>
      <form className='flex flex-col' onSubmit={onSubmit}>
        {params.map((param) => {
          return (
            <div className='flex'>
              <label htmlFor={String(param.id)}>{param.name}:</label>
              <input
                className='border-2'
                type={getInputType(param.type)}
                name={param.name}
                id={String(param.id)}
                value={getModelParamValue(param.id)}
                onChange={onChange}
              />
            </div>
          );
        })}
        <button type='submit' className='border-2 max-w-max'>
          Получить модель
        </button>
      </form>
      {openModel && (
        <div>
          <pre>{getModel()}</pre>
          <button
            type='button'
            onClick={() => setOpenModel(false)}
            className='border-2 max-w-max'
          >
            Закрыть
          </button>
        </div>
      )}
    </>
  );
};

export default ParamEditor;
