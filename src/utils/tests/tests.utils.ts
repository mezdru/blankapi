import { Repository } from "typeorm";

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  })
);
