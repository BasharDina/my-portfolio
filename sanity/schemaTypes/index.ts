import {type SchemaTypeDefinition} from 'sanity'

import {projectType} from './projectType'
import {galleryGroupType} from './galleryGroupType'
import {projectSectionType} from './projectSectionType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [projectType, galleryGroupType, projectSectionType],
}