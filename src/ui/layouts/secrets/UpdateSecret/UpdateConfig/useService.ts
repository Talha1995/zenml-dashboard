import { useSelector } from 'react-redux';
import {
  // stackSelectors,
  secretSelectors,
} from '../../../../../redux/selectors';

// import YAML from 'json2yaml';

interface ServiceInterface {
  // downloadYamlFile: () => void;
  // stackConfig: string;
  secret: any;
}

export const useService = ({
  secretId,
}: {
  secretId: TId;
}): ServiceInterface => {
  const secret: TStack = useSelector(secretSelectors.secretForId(secretId));

  // const yamlConfigObj: any = {
  //   stack_name: stack.name,
  //   components: {},
  // };

  // Object.keys(stack.components).forEach((element) => {
  //   yamlConfigObj.components[element] = {
  //     flavor: stack?.components[element][0]?.flavor,
  //     name: stack?.components[element][0]?.name,
  //     id: stack?.components[element][0]?.id,
  //     ...stack?.components[element][0]?.configuration,
  //   };
  // });

  // const stackConfig = YAML.stringify(yamlConfigObj);

  // const downloadYamlFile = () => {
  //   const element = document.createElement('a');

  //   const file = new Blob([stackConfig], {
  //     type: 'text/yaml',
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = `${stack.id}-config.yaml`;
  //   document.body.appendChild(element);
  //   element.click();
  // };

  return { secret };
};
