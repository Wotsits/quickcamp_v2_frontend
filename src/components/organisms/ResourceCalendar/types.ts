export type Resource = {
  id: number;
  name: string;
};

export type ResourceGroup = {
  id: number;
  resourceTypeName: string;
  resources: Resource[];
};
