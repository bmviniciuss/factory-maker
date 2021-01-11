import { DeepPartial } from 'utility-types';

export function factoryMaker<ModelInterface = any>(
  modelMakerFn: (options?: DeepPartial<ModelInterface>) => ModelInterface
): <AmountOfModelsToGenerate extends number>(
  quantity: AmountOfModelsToGenerate,
  options?: DeepPartial<ModelInterface>
) => AmountOfModelsToGenerate extends 1 ? ModelInterface : ModelInterface[] {
  return <N extends number>(
    quantity: N,
    options?: DeepPartial<ModelInterface>
  ): N extends 1 ? ModelInterface : ModelInterface[] => {
    const amountOfModel = quantity <= 0 ? 1 : quantity;
    const entitiesArray = new Array(amountOfModel)
      .fill(null)
      .map(() => modelMakerFn(options));
    return (amountOfModel === 1
      ? entitiesArray[0]
      : entitiesArray) as N extends 1 ? ModelInterface : ModelInterface[];
  };
}
