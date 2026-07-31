INSERT INTO pedidos
(
id_cliente,
estado,
total
)
VALUES
(
1,
'Pendiente',
18000
);

INSERT INTO detalle_pedido
(
id_pedido,
id_producto,
cantidad,
precio_unitario,
subtotal
)
VALUES
(
1,
1,
1,
18000,
18000
);

INSERT INTO pagos
(
id_pedido,
metodo_pago,
monto,
observacion
)
VALUES
(
1,
'Efectivo',
18000,
'Pago realizado en caja'
);

SELECT * FROM producto;