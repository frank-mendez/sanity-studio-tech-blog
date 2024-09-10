import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './defaultDocumentNode'
import {tags} from 'sanity-plugin-tags'

export default defineConfig({
  name: 'default',
  title: 'Frank Tech Blog',

  projectId: 'b124320u',
  dataset: 'production',

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }), visionTool(), tags({})],

  schema: {
    types: schemaTypes,
  },
})
