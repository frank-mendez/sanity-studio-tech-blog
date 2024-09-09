import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'Frank Tech Blog',

  projectId: 'b124320u',
  dataset: 'production',

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
