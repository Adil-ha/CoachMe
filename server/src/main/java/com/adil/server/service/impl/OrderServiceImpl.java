package com.adil.server.service.impl;

import com.adil.server.dto.OrderDTO;
import com.adil.server.dto.OrderDetailDTO;
import com.adil.server.entity.Book;
import com.adil.server.entity.Order;
import com.adil.server.entity.OrderDetail;
import com.adil.server.entity.enums.OrderStatus;
import com.adil.server.mapper.OrderMapper;
import com.adil.server.mapper.OrderMapperr;
import com.adil.server.repository.BookRepository;
import com.adil.server.repository.OrderRepository;
import com.adil.server.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapperr orderMapper;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = orderMapper.toEntity(orderDTO);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        Order savedOrder = orderRepository.save(order);
        updateTotalAmount(savedOrder); // Met à jour le montant total de la commande
        return orderMapper.toDto(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return orderMapper.toDto(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addBookToOrder(Long orderId, OrderDetailDTO orderDetailDTO) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Book book = bookRepository.findById(orderDetailDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<OrderDetail> existingOrderDetailOptional = order.getOrderDetails().stream()
                .filter(orderDetail -> orderDetail.getBook().getId().equals(orderDetailDTO.getBookId()))
                .findFirst();

        if (existingOrderDetailOptional.isPresent()) {
            OrderDetail existingOrderDetail = existingOrderDetailOptional.get();
            existingOrderDetail.setQuantity(existingOrderDetail.getQuantity() + orderDetailDTO.getQuantity());
        } else {
            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .book(book)
                    .quantity(orderDetailDTO.getQuantity())
                    .build();
            order.getOrderDetails().add(orderDetail);
        }

        orderRepository.save(order);
        updateTotalAmount(order); // Met à jour le montant total de la commande
    }

    @Override
    @Transactional
    public void removeBookFromOrder(Long orderId, Long bookId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Optional<OrderDetail> existingOrderDetailOptional = order.getOrderDetails().stream()
                .filter(orderDetail -> orderDetail.getBook().getId().equals(bookId))
                .findFirst();

        if (existingOrderDetailOptional.isPresent()) {
            OrderDetail existingOrderDetail = existingOrderDetailOptional.get();
            order.getOrderDetails().remove(existingOrderDetail);
        } else {
            throw new RuntimeException("Book not found in the order");
        }

        orderRepository.save(order);
        updateTotalAmount(order); // Met à jour le montant total de la commande
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderRepository.delete(order);
        updateTotalAmount(order);
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(newStatus);
        orderRepository.save(order);
    }

    private void updateTotalAmount(Order order) {
        double totalAmount = order.getOrderDetails().stream()
                .mapToDouble(orderDetail -> orderDetail.getQuantity() * orderDetail.getBook().getPrice())
                .sum();
    }
}







