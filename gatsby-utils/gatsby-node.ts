import { CreatePageArgs, CreatePagesArgs } from 'gatsby'
import { generateProjectPages, removeInvalidProjectPages } from './helpers'

export const createPages = async (args: CreatePagesArgs): Promise<void> => {
  await generateProjectPages(args)
}

export const onCreatePage = async (args: CreatePageArgs): Promise<void> => {
  await removeInvalidProjectPages(args)
}
