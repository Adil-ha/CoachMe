package com.adil.server.controller;

import com.adil.server.dto.OrderDTO;
import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.dto.ReponseMessage;
import com.adil.server.service.OrderService;
import com.adil.server.service.impl.PaymentService;
import com.adil.server.wrapper.OrderStatusWrapper;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        OrderDTO createdOrder = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(createdOrder);
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/{orderId}/books")
    public String addBooksToOrder(@PathVariable Long orderId, @RequestBody List<OrderDetailDTO> orderDetailDTOList) {

        for (OrderDetailDTO orderDetailDTO : orderDetailDTOList) {
            orderService.addBookToOrder(orderId, orderDetailDTO);
        }
        try {
            return paymentService.createPayment(orderDetailDTOList, orderId);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatusWrapper statusWrapper) {
        orderService.updateOrderStatus(orderId, statusWrapper.getOrderStatus());
        return ResponseEntity.noContent().build();
    }
}

