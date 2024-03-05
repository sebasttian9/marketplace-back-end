const prepareHateoas = async (entity, data) => {
    // let stocktotal = 0;
      const results = data
        .map((v) => {
        //   stocktotal = stocktotal + v.stock;
          return {
            nombre: v.nombre,
            SKU: v.sku,
            detalle: `/api/v1/${entity}/${v.sku}`,
            imagen: 'crear join con tbl_imagenes',
            precio: v.precio_lista,
            stock: v.stock,
            marca: v.marca_producto,
            usado: v.usado

          };
        });
        // .slice(0, 4);
      const total = data.length;
      const HATEOAS = {
        total,
        results,
      };
      return HATEOAS;
    };
    
    export default prepareHateoas;