const prepareHateoas = async (entity, data) => {
  let total_general = 0;
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
      descripcion: v.descripcion
    };

    // Agregar vendedor solo si está presente
    if (v.nombre_vendedor) {
      hateoasObject.vendedor = v.nombre_vendedor;
    }

    total_general = parseInt(v.total_general);

    return hateoasObject;
  });

  const total = data.length;
  const HATEOAS = {
    total_general,
    total,
    results,
  };
  return HATEOAS;
};

export default prepareHateoas;
