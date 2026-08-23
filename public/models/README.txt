FOREST 170 model replacement

Required production files:
- forest-170.glb        desktop target, ideally <= 8 MB
- forest-170-mobile.glb mobile target, ideally <= 3–4 MB

How to replace the placeholder:
1. Export the approved architectural source from Archicad / Revit / SketchUp / 3ds Max.
2. Clean and optimize in Blender.
3. Apply Draco or Meshopt compression where appropriate.
4. Convert textures to KTX2/Basis or optimized WebP/AVIF workflow.
5. Bake lighting for static surfaces where dynamic light is not needed.
6. Put the files in this folder using the exact names above.
7. Open `data/scene.ts`.
8. Set `usePlaceholder: false`.
9. Adjust `modelTransform` position / rotation / scale if required.
10. Run the project and verify all camera keyframes.

Do not present the placeholder primitive house as an exact FOREST 170.

Recommended Blender checks:
- remove hidden geometry;
- merge unnecessary materials;
- apply transforms;
- reduce polygon count without damaging silhouette;
- preserve UVs;
- separate only objects needed for interactive construction/cutaway stages;
- set sensible origins;
- test normals;
- export GLB with embedded textures.
