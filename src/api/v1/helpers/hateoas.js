const prepareHateoas = async (entity, data) => {
  const results = data.map((v) => {
    const hateoasObject = {
      nombre: v.nombre,
      SKU: v.sku,
      detalle: v.descripcion,
      imagen: "crear join con tbl_imagenes",
      precio: v.precio_lista,
      stock: v.stock,
      marca: v.marca_producto,
      usado: v.usado,
    };

    // Agregar vendedor solo si está presente
    if (v.nombre_vendedor) {
      hateoasObject.vendedor = v.nombre_vendedor;
    }

    return hateoasObject;
  });

  const total = data.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

export default prepareHateoas;
