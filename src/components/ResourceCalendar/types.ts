export type Resource = {
  id: any;
  name: string;
};

export type ResourceGroup = {
  class: string;
  resources: Resource[];
};
