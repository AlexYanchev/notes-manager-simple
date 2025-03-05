import React, { FC, useState } from 'react';
import ParamEditor from './paramEditor';

export type TypeParamValue = 'string' | 'number';

type Color = string;

interface ParamValue<TypeValue> {
  paramId: number;
  value: TypeValue;
}

export interface Param {
  id: number;
  name: string;
  type: TypeParamValue;
}

export interface Model {
  paramValues: ParamValue<string | number>[];
  colors: Color[];
}

const Main: FC = () => {
  const [params, setParams] = useState<Param[]>([
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'number' },
  ]);

  const [model, setModel] = useState<Model>({
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 8 },
    ],
    colors: ['black'],
  });

  return <ParamEditor params={params} model={model} />;
};

export default Main;
